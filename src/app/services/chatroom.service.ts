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
  public chatrooms: Observable<any>;
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
    this.chatrooms = db.collection('chatrooms').valueChanges();
    this.users = db.collection('users').valueChanges();
    this.selectedChatroom = this.changeChatroom.pipe(
      switchMap(chatroomId => {
        if (chatroomId) {
          const dbId = `${
            this.authService.currentUserSnapshot.id
          }_${chatroomId}`;
          this.loadingService.isLoading.next(true);
          return db.doc(`chatrooms/${dbId}`).valueChanges();
        }
        return of(null);
      })
    );

    this.newChatroom = this.changeChatroom.pipe(
      switchMap(chatroomId => {
        if (chatroomId) {
          const dbId = `${
            this.authService.currentUserSnapshot.id
            }_${chatroomId}`;
          this.loadingService.isLoading.next(true);
          db.doc(`chatrooms/${dbId}`).set( {
            id: dbId,
            unread: false,
            owner: this.authService.currentUserSnapshot.id
          });
          return db.doc(`chatrooms/${dbId}`).valueChanges();

        }
        return of(null);
      })
    );

    this.selectedChatroomMessages = this.changeChatroom.pipe(
      switchMap(chatroomId => {
        if (chatroomId) {
          const dbId = `${
            this.authService.currentUserSnapshot.id
          }_${chatroomId}`;

          this.loadingService.isLoading.next(true);
          db.doc(`chatrooms/${dbId}`).update({
            unread: false
          });
          db.doc(`users/${this.authService.currentUserSnapshot.id}`).update({
            currentChatroom: dbId
          });
          return db
            .collection(`chatrooms/${dbId}/messages`, queryRef => {
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
    const dbId = `${this.authService.currentUserSnapshot.id}_${chatroomId}`;
    const reverseDbID = `${chatroomId}_${
      this.authService.currentUserSnapshot.id
    }`;

    const message = {
      message: msg,
      createdAt: new Date(),
      sender: this.authService.currentUserSnapshot
    };

    if ( dbId !== reverseDbID) {

    this.db.collection(`chatrooms/${dbId}/messages`).add(message);

    let currentChatroom = '';
      this.db
        .doc(`users/${chatroomId}`)
        .valueChanges()
        .subscribe(doc => (currentChatroom = doc['currentChatroom']));


    this.db.doc(`chatrooms/${reverseDbID}`).update({
      unread: true
    }).catch(err => console.log('No document to be updated'));
    this.db.collection(`chatrooms/${reverseDbID}/messages`).add(message);
    } else {
      this.db.collection(`chatrooms/${dbId}/messages`).add(message);
    }
  }

  getChatrooms(): Observable<any> {

    return this.db.collection(`chatrooms`, querryRef => {
      return querryRef.where('owner', '==', this.authService.currentUserSnapshot.id);
    }).valueChanges();

  }
}
