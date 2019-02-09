import { Injectable } from '@angular/core';

import { Observable, BehaviorSubject, of, from } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { LoadingService } from './loading.service';
import { switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';



@Injectable({
  providedIn: 'root'
})
export class ChatroomService {
  public chatrooms: Observable<Array<any>> = of([]);
  public users: Observable<any>;
  public changeChatroom: BehaviorSubject<string | null> = new BehaviorSubject(
    null
  );
  public selectedChatroom: Observable<any>;
  public selectedChatroomMessages: Observable<any>;
  public newChatroom: Observable<any>;
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
          return db
            .doc(`chatrooms/${this.authService.currentUserSnapshot.id}/chatrooms/${chatroomId}`)
            .valueChanges();
        }
        return of(null);
      })
    );

    this.newChatroom = this.changeChatroom.pipe(
      switchMap(chatroomId => {
        console.log(chatroomId);
        if (chatroomId) {
          this.loadingService.isLoading.next(true);
          this.db.collection(`users`).doc(chatroomId).valueChanges().subscribe(dbuser => {

            console.log(dbuser);
            this.db.collection(`chatrooms/${this.authService.currentUserSnapshot.id}/chatrooms`).doc(chatroomId).set({
              user: dbuser,
              unread: 0,
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
          db.collection(`chatrooms`).doc(this.authService.currentUserSnapshot.id).update({
            unread: 0
          }).catch(err => console.log('this is a new document'));

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
    console.log(chatroomId);

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


    /* this.db.doc(`chatrooms/${chatroomId}/${this.authService.currentUserSnapshot.id}`).update({
      unread: 1
    }).catch(err => console.log('No document to be updated')); */

  }

  public getChatrooms(): Observable<any> {

      return this.db
        .collection(`chatrooms/${this.authService.currentUserSnapshot.id}/chatrooms`)
        .valueChanges();

  }
}
