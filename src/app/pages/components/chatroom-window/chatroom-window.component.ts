import { Component, OnInit, OnDestroy, AfterViewChecked, ElementRef, ViewChild, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ChatroomService } from '../../../services/chatroom.service';
import { LoadingService } from '../../../services/loading.service';

@Component({
  selector: 'app-chatroom-window',
  templateUrl: './chatroom-window.component.html',
  styleUrls: ['./chatroom-window.component.scss']
})
export class ChatroomWindowComponent implements OnInit, OnDestroy, AfterViewChecked, OnChanges {

  @ViewChild('scrollContainer') private scrollContainer: ElementRef;
  @Input() chatroomID;

  public chatroom: Observable<any>;
  private subscriptions: Subscription[] = [];
  public messages: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private chatroomService: ChatroomService,
    private loadingService: LoadingService
  ) {
    this.subscriptions.push(
      this.chatroomService.selectedChatroom.subscribe(chatroom => {
      if (chatroom) {
      this.chatroom = chatroom;
      } else {
        this.subscriptions.push(this.chatroomService.newChatroom.subscribe(newChatroom => {
          this.chatroom = newChatroom;
        }));
      }
      console.log(chatroom);
      this.loadingService.isLoading.next(false);
    }));

  }

  ngOnInit() {
    this.scrollToBottom();
    this.subscriptions.push(
      this.chatroomService.selectedChatroomMessages.subscribe(messages => {
        this.messages = messages;
        this.loadingService.isLoading.next(false);
      })
    );
  }

  private scrollToBottom(): void {

    try {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    } catch (error) {
    }
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

ngOnChanges(changes: SimpleChanges) {

  console.log();
  this.chatroomService.changeChatroom.next(changes.chatroomID.currentValue);

}

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
