import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewChecked,
  ElementRef,
  ViewChild,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ChatroomService } from '../../../services/chatroom.service';
import { LoadingService } from '../../../services/loading.service';

@Component({
  selector: 'app-chatroom-window',
  templateUrl: './chatroom-window.component.html',
  styleUrls: ['./chatroom-window.component.scss']
})
export class ChatroomWindowComponent
  implements OnInit, OnDestroy, AfterViewChecked, OnChanges {
  @ViewChild('scrollContainer') private scrollContainer: ElementRef;
  @Input() chatroomID;

  public chatroom: Observable<any>;
  private subscriptions: Subscription[] = [];
  public messages: Observable<any>;

  constructor(
    public chatroomService: ChatroomService,
    private loadingService: LoadingService
  ) {
    this.subscriptions.push(
      this.chatroomService.selectedChatroom.subscribe(chatroom => {
        console.log(chatroom);
        this.chatroom = chatroom;
        this.loadingService.isLoading.next(false);
        if(chatroom) this.chatroomService.setCurrentChatroom(chatroom.user.id);

      })
    );
    this.subscriptions.push(
      this.chatroomService.newChatroom.subscribe(newChatroom => {
        console.log(newChatroom)
        this.chatroom = newChatroom;
        this.loadingService.isLoading.next(false);

      })
    );
  }

  ngOnInit() {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    try {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    } catch (error) {}
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  ngOnChanges(changes: SimpleChanges) {
     // this.chatroomService.changeChatroom.next(changes.chatroomID.currentValue);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
