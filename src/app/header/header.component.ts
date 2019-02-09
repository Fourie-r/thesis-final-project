import { Component, OnInit, Input } from '@angular/core';
import { ChatroomService } from '../services/chatroom.service';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private chatroomService: ChatroomService) {}
  @Input() drawer;
  ngOnInit() {}

  toggle() {

    console.log('CLICK CLICK');
    this.drawer.toggle();
  }
}
