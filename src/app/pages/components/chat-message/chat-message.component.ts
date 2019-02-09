import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../../../classes/message.model';
import { AuthService } from 'src/app/services/auth.service';




@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss']
})
export class ChatMessageComponent implements OnInit {

  @Input() message: Message;
  isOwnMessage: boolean;
  ownEmail: string;
  userEmail: string;

  constructor(private authService: AuthService) {

    this.authService.currentUser.subscribe(user => {

      this.ownEmail = user.email;
      this.isOwnMessage = this.ownEmail === this.userEmail;
    });
  }

  ngOnInit( chatMessage = this.message) {

    this.userEmail = chatMessage.sender.email;
  }

}
