import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ChatroomService } from '../../services/chatroom.service';
import { LoadingService } from '../../services/loading.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public currentUser: any = null;
  public backlog = false;
  public unread = false;
  @Input() drawer;
  constructor(public authService: AuthService, private chatroomService: ChatroomService, private loadingService: LoadingService) { }

  ngOnInit() {
    this.authService.currentUser.subscribe( user => {
      this.currentUser = user;
      if (user) {
        this.chatroomService.getUnread(user).subscribe(chatrooms => {
          let unread = false;
          chatrooms.forEach(chatroom => {
            if (chatroom['unread']) {
              unread = true;
            }
            this.unread = unread;
          });
        });
      }
    });
  }

  public logout(): void {
    this.loadingService.isLoading.next(true);

    this.drawer.close();
    this.chatroomService.setCurrentChatroom('');
    this.authService.logout();
  }
  toggle() {
    this.drawer.toggle();
    this.chatroomService.chatrooms = this.chatroomService.getChatrooms();
    if (!this.drawer.opened) {
      this.chatroomService.setCurrentChatroom();
    }

  }
}
