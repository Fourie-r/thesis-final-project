import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of, from } from 'rxjs';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { LoadingService } from './loading.service';
import {
  switchMap,
  map,
  distinctUntilChanged,
  tap,
  debounceTime
} from 'rxjs/operators';
import { AuthService } from './auth.service';
import { User } from '../classes/user.model';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatroomService {
  public chatrooms: Observable<Array<any>> = of([]); // holds all chatrooms for the user
  public users: Observable<any>; // holds all users

  // observable used for singlaing a change of chatrooms
  public changeChatroom: BehaviorSubject<string | null> = new BehaviorSubject(
    null
  );
  // observable singnaling the creation of new chatroom
  public createChatroom: BehaviorSubject<string | null> = new BehaviorSubject(
    null
  );
  // observable signaling the chatroom addition in the list of a user that receives a message from unknown user
  public createForeignChatroom: BehaviorSubject<
    string | null
  > = new BehaviorSubject(null);
  public selectedChatroom: Observable<any>;
  public selectedChatroomMessages: Observable<any>;
  public newChatroom: Observable<any>;
  public newForeignChatroom: Observable<any>;
  public statArr = [];
  constructor(
    private db: AngularFirestore,
    private loadingService: LoadingService,
    private authService: AuthService
  ) {
    this.users = db.collection('users').valueChanges();
    this.selectedChatroom = this.changeChatroom.pipe(
      switchMap(chatroomId => {
        first(), console.log(chatroomId);
        if (chatroomId) {
          this.loadingService.isLoading.next(true);

          return db
            .doc(
              `chatrooms/${
                this.authService.currentUserSnapshot.id
              }/chatrooms/${chatroomId}`
            )
            .valueChanges()
            .pipe(
              tap(() => {
                this.setCurrentChatroom(chatroomId);
              })
            );
        }
        return of(null);
      })
    );

    this.newChatroom = this.createChatroom.pipe(
      switchMap(chatroomId => {
        first(), console.log(chatroomId);
        if (chatroomId) {
          this.loadingService.isLoading.next(true);
          this.db
            .collection(`users`)
            .doc(chatroomId)
            .valueChanges()
            .subscribe(dbuser => {
              console.log(dbuser);
              this.db
                .collection(
                  `chatrooms/${
                    this.authService.currentUserSnapshot.id
                  }/chatrooms`
                )
                .doc(chatroomId)
                .set({
                  user: dbuser,
                  unread: false,
                  owner: this.authService.currentUserSnapshot.id
                });

              return this.db
                .doc(
                  `chatrooms/${
                    this.authService.currentUserSnapshot.id
                  }/chatrooms/${chatroomId}`
                )
                .valueChanges();
            });
        }
        return of(null);
      })
    );

    this.createForeignChatroom
      .pipe(
        switchMap(chatroomId => {
          first(), console.log(chatroomId);
          if (chatroomId) {
            this.authService.currentUser.subscribe(user => {
              this.db
                .collection(`chatrooms/${chatroomId}/chatrooms`)
                .doc(this.authService.currentUserSnapshot.id)
                .set({
                  user: user,
                  unread: false,
                  owner: chatroomId
                })
                .then(() => {
                  this.db
                    .doc(
                      `chatrooms/${chatroomId}/chatrooms/${
                        this.authService.currentUserSnapshot.id
                      }`
                    )
                    .update({ unread: true })
                    .catch(err =>
                      console.log('Could not update Unread property', err)
                    );
                })
                .catch(err => console.log(err));

              return this.db
                .doc(
                  `chatrooms/${chatroomId}/chatrooms/${
                    this.authService.currentUserSnapshot.id
                  }`
                )
                .valueChanges();
            });
          }
          return of(null);
        })
      )
      .subscribe();

    this.selectedChatroomMessages = this.changeChatroom.pipe(
      switchMap(chatroomId => {
        if (chatroomId) {
          let chatID = '';
          if (chatroomId < this.authService.currentUserSnapshot.id) {
            chatID = chatroomId + this.authService.currentUserSnapshot.id;
          } else {
            chatID = this.authService.currentUserSnapshot.id + chatroomId;
          }
          console.log(chatID);
          return db
            .collection(`messages/${chatID}/messages`, queryRef => {
              return queryRef.orderBy('createdAt', 'asc').limit(50);
            })
            .valueChanges();
        }
        return of(null);
      })
    );
    // this.chatrooms = db.collection('users').valueChanges();
    // console.log(this.chatrooms);
  }

  // adds a message to the db
  public createMessage(msg: string): void {
    const chatroomId = this.changeChatroom.value;
    // console.log(chatroomId);

    let chatID = '';
    if (chatroomId < this.authService.currentUserSnapshot.id) {
      chatID = chatroomId + this.authService.currentUserSnapshot.id;
    } else {
      chatID = this.authService.currentUserSnapshot.id + chatroomId;
    }

    const message = {
      message: msg,
      createdAt: new Date(),
      sender: this.authService.currentUserSnapshot
    };

    this.db.collection(`messages/${chatID}/messages`).add(message);
    this.db
      .doc(`users/${chatroomId}`)
      .valueChanges()
      .pipe(first())
      .subscribe((user: User) => {
        if (user.currentChatroom !== this.authService.currentUserSnapshot.id) {
          this.db
            .doc(
              `chatrooms/${chatroomId}/chatrooms/${
                this.authService.currentUserSnapshot.id
              }`
            )
            .valueChanges()
            .pipe(first())
            .subscribe(chatroom => {
              console.log(chatroom);
              if (!chatroom) {
                console.log('chatroom', chatroom);

                this.createForeignChatroom.next(chatroomId);
              } else {
                this.db
                  .doc(
                    `chatrooms/${chatroomId}/chatrooms/${
                      this.authService.currentUserSnapshot.id
                    }`
                  )
                  .update({ unread: true })
                  .catch(err =>
                    console.log('Could not update Unread property', err)
                  );
              }
            });
        }
      });
  }

  // returns all chatrooms for a user
  public getChatrooms(): Observable<any> {
    return this.db
      .collection(
        `chatrooms/${this.authService.currentUserSnapshot.id}/chatrooms`
      )
      .valueChanges()
      .pipe(
        tap(rooms => {
          this.statArr = [];
          rooms.forEach(room =>
            this.statArr.push(this.getStatus(room.user.id))
          );
        })
      );
  }

  // sets the currentChatroom property of the user
  public setCurrentChatroom(id?: string): void {
    if (id) {
      this.db
        .doc(
          `chatrooms/${this.authService.currentUserSnapshot.id}/chatrooms/${id}`
        )
        .update({ unread: false })
        .catch(err =>
          console.log(
            'Error in updating the unread property of the chatroom',
            err
          )
        );

      this.db
        .doc(`users/${this.authService.currentUserSnapshot.id}`)
        .update({ currentChatroom: id })
        .catch(err => console.log('Error setting currentChatroom', err));
    } else {
      this.db
        .doc(`users/${this.authService.currentUserSnapshot.id}`)
        .update({ currentChatroom: ' ' })
        .catch(err => console.log('Error setting currentChatroom', err));
    }
  }

  // gets the Online/Ofline status of each user
  public getStatus(id: string): Observable<string> {
    console.log(id);

    return this.db
      .doc(`users/${id}`)
      .valueChanges()
      .pipe(
        tap(user => console.log(user)),
        map((user: User) => user.status)
      );
  }

  // return the unread property for a user
  public getUnread(user) {
    return this.db.collection(`chatrooms/${user.id}/chatrooms`).valueChanges();
  }
}
