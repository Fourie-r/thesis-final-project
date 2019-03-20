import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  constructor() { }

  public chatroomId;
  ngOnInit() {
  }

  // assigns and propagates the id through the component chain
  setId(id) {
    console.log(id);
    this.chatroomId = id;
  }
}
