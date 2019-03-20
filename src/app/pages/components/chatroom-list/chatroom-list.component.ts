import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';
import { ChatroomService } from '../../../services/chatroom.service';
import { AuthService } from '../../../services/auth.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserListComponent } from '../user-list/user-list.component';
import { Subscription } from 'rxjs';

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
    public authService: AuthService,
    public dialog: MatDialog
  ) {}

  status = ''; // holds the unraed status for a user
  statArr = []; // holds the online statuses of all users
  @Output() valueChange = new EventEmitter();
  chatrooms = [];
  subsciptions: Subscription[] = [];
  divItems = document.getElementsByClassName('chatroom-list-item');

  ngOnInit() {}

  passID(id) {
    console.log(id);
    this.chatroomService.changeChatroom.next(id);
  }

  // opens a window with all available users
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
