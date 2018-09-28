import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.scss']
})
export class ChatInputComponent implements OnInit {
  public newMessageText = '';

  constructor() {}

  public submit(message: string): void {
    // TODO save text to Firebase
    console.log('New Message', message);
    this.newMessageText = '';
  }

  ngOnInit() {}
}
