import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chatroom-window',
  templateUrl: './chatroom-window.component.html',
  styleUrls: ['./chatroom-window.component.scss']
})
export class ChatroomWindowComponent implements OnInit {
  public dummyData = [
    {
      message: 'I was at the supermarket',
      createdAt: new Date(),
      sender: {
        firstName: 'Ivan',
        lastName: 'Mihaylov',
        photoUrl: 'http://via.placeholder.com/50x50'
      }
    },
    {
      message: 'I was already there',
      createdAt: new Date(),
      sender: {
        firstName: 'Constanze',
        lastName: 'Moeller',
        photoUrl: 'http://via.placeholder.com/50x50'
      }
    }
  ];

  constructor() {}

  ngOnInit() {}
}
