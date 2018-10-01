import { Component, OnInit } from '@angular/core';
import { ChatroomService } from '../../../services/chatroom.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-chatroom-list',
  templateUrl: './chatroom-list.component.html',
  styleUrls: ['./chatroom-list.component.scss']
})
export class ChatroomListComponent implements OnInit {
  constructor(
    public chatroomService: ChatroomService,
    private router: Router,
    private authService: AuthService,
    private db: AngularFirestore
  ) {}

  ngOnInit() {
    // this.chatroomService.chatrooms.subscribe(users => console.log(users));
  }

  public startChat(id: string): void {
    console.log(id);
    // this.router.navigate(['/chat', id]);
    let currentUserId = '';
    this.authService.currentUser.subscribe(user => (currentUserId = user.id));
    const conversationIdOne = id + '_' + currentUserId;
    const conversationIdTwo = currentUserId + '_' + id;
    // this.db.collection('chatrooms').doc(`${conversationIdOne}`)
  }
}
