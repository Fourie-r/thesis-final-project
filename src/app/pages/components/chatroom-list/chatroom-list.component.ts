import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';
import { ChatroomService } from '../../../services/chatroom.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserListComponent } from '../user-list/user-list.component';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-chatroom-list',
  templateUrl: './chatroom-list.component.html',
  styleUrls: ['./chatroom-list.component.scss']
})
export class ChatroomListComponent implements OnInit, OnDestroy {
  public chatroomId: string;
  selected;
  constructor(
    public chatroomService: ChatroomService,
    private router: Router,
    public authService: AuthService,
    private db: AngularFirestore,
    public dialog: MatDialog
  ) {}

  status = '';
  statArr = [];
  @Output() valueChange = new EventEmitter();
  chatrooms = [];
  subsciptions: Subscription[] = [];
  divItems = document.getElementsByClassName('chatroom-list-item');

  ngOnInit() {

  }

  passID(id) {
    console.log(id);
    this.chatroomService.changeChatroom.next(id);
  }

  startChat() {
    const users = this.chatroomService.users;
    // console.log(this.chatroomService.users);
    const dialogRef = this.dialog.open(UserListComponent, {
      width: '40%',
      height: '80%',
      data: { users },
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed with', result);
      if (result) {
      this.chatroomService.createChatroom.next(result);

      }
    });
  }

  ngOnDestroy() {
    this.subsciptions.forEach(sub => sub.unsubscribe());
  }
}
