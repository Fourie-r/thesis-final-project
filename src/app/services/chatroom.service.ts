import { Injectable } from '@angular/core';

import { Observable, BehaviorSubject, of, from } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { LoadingService } from './loading.service';
import { switchMap, map, distinctUntilChanged, tap, debounceTime } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { User } from '../classes/user.model';
import { first } from 'rxjs/operators';




@Injectable({
  providedIn: 'root'
})
export class ChatroomService {
  public chatrooms: Observable<Array<any>> = of([]);
  public users: Observable<any>;
  public changeChatroom: BehaviorSubject<string | null> = new BehaviorSubject(
    null
  );
  public createChatroom: BehaviorSubject<string | null> = new BehaviorSubject(
    null
  );
  public selectedChatroom: Observable<any>;
  public selectedChatroomMessages: Observable<any>;
  public newChatroom: Observable<any>;
  public statArr = [];
  constructor(
    private db: AngularFirestore,
    private loadingService: LoadingService,
    private authService: AuthService
  ) {

    this.users = db.collection('users').valueChanges();
    this.selectedChatroom = this.changeChatroom.pipe(
      switchMap(chatroomId => {
        console.log(chatroomId);
        if (chatroomId) {
          this.loadingService.isLoading.next(true);
          db
            .doc(`chatrooms/${this.authService.currentUserSnapshot.id}/chatrooms/${chatroomId}`).update({unread: false})
            .catch(err => console.log('Error in updating the unread property of the chatroom', err));

          return db
            .doc(`chatrooms/${this.authService.currentUserSnapshot.id}/chatrooms/${chatroomId}`)
            .valueChanges();
        }
        return of(null);
      })
    );

    this.newChatroom = this.createChatroom.pipe(
      switchMap(chatroomId => {
        console.log(chatroomId);
        if (chatroomId) {
          this.loadingService.isLoading.next(true);
          this.db.collection(`users`).doc(chatroomId).valueChanges().subscribe(dbuser => {

            console.log(dbuser);
            this.db.collection(`chatrooms/${this.authService.currentUserSnapshot.id}/chatrooms`).doc(chatroomId).set({
              user: dbuser,
              unread: false,
              owner: this.authService.currentUserSnapshot.id
            });


            return this.db.doc(`chatrooms/${this.authService.currentUserSnapshot.id}/chatrooms/${chatroomId}`)
              .valueChanges();
          });
        }
        return of(null);
      })
    );

    this.selectedChatroomMessages = this.changeChatroom.pipe(
      switchMap(chatroomId => {
        if (chatroomId) {

          let chatID = '';
          if (chatroomId < this.authService.currentUserSnapshot.id) {
            chatID =  chatroomId + this.authService.currentUserSnapshot.id;
          } else {
            chatID = this.authService.currentUserSnapshot.id + chatroomId;
          }

          this.loadingService.isLoading.next(true);
          this.setCurrentChatroom(chatroomId);

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
    this.db.doc(`users/${chatroomId}`).valueChanges().pipe(first()).subscribe((user: User) => {
      if (user.currentChatroom !== this.authService.currentUserSnapshot.id) {
          this.db.doc(`chatrooms/${chatroomId}/chatrooms/${this.authService.currentUserSnapshot.id}`).update({unread: true})
          .catch(err => console.log('Could not update Unread property', err));
      }
    });

  }

  public getChatrooms(): Observable<any> {

      return this.db
        .collection(`chatrooms/${this.authService.currentUserSnapshot.id}/chatrooms`)
        .valueChanges().pipe(tap((rooms) => {
          this.statArr = [];
          rooms.forEach(room =>
            this.statArr.push(this.getStatus(room.user.id))
          );
        }));

  }


  public setCurrentChatroom(id: string): void {

    this.db.doc(`users/${this.authService.currentUserSnapshot.id}`).update({ currentChatroom: id })
    .catch(err => console.log('Error setting currentChatroom', err));

  }

  public getStatus(id: string): Observable<string> {
    console.log(id);

    return this.db.doc(`users/${id}`).valueChanges().pipe(
      tap((user) => console.log(user)),
      map((user: User) => user.status)
    );
  }
}
