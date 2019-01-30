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

  setId(id) {
    console.log(id);
    this.chatroomId = id;
  }
}
