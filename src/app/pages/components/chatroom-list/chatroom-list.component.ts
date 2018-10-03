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
  }

}
