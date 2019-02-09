import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

/* import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../../store';
import { effects } from '../../store/effects'; */
import { FormsModule } from '@angular/forms';
import { BoardComponent } from '../body-contents/board/board.component';
import { ChatComponent } from '../pages/chat/chat.component';
import { ChatInputComponent } from '../pages/components/chat-input/chat-input.component';
import { ChatroomListComponent } from '../pages/components/chatroom-list/chatroom-list.component';
import { ChatroomTitleBarComponent } from '../pages/components/chatroom-title-bar/chatroom-title-bar.component';
import { ChatMessageComponent } from '../pages/components/chat-message/chat-message.component';
import { ChatroomWindowComponent } from '../pages/components/chatroom-window/chatroom-window.component';
import { BodyContentsComponent } from '../body-contents/body-contents.component';
import { PeoplesComponent } from '../body-contents/peoples/peoples.component';
import { AddTaskComponent } from '../body-contents/add-task/add-task.component';
import { UserListComponent } from '../pages/components/user-list/user-list.component';
import { BacklogComponent } from '../pages/backlog/backlog-component';
/* import { SignInComponent } from './components/sign-in/sign-in.component';
import { signinRouter } from './authentication.router';
import { ComponentLibraryModule } from '../component-library-module';
 */
import { boardRouter } from './board.router';
import { MaterialModule } from '../shared/materaial-components/matrial.component';


// Kendo


import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { ChartModule } from '@progress/kendo-angular-charts';

import { DndModule } from 'ng2-dnd';
import { MomentModule } from 'angular2-moment';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { RouterModule } from '@angular/router';


@NgModule({

  declarations: [
    BoardComponent,
    ChatComponent,
    ChatInputComponent,
    ChatroomListComponent,
    ChatroomTitleBarComponent,
    ChatMessageComponent,
    ChatroomWindowComponent,
    BodyContentsComponent,
    PeoplesComponent,
    AddTaskComponent,
    BacklogComponent,
    UserListComponent

  ],
  imports: [
    FormsModule,
    HttpClientModule,
    CommonModule,
    boardRouter,
    MaterialModule,
    DndModule.forRoot(),
    DialogModule,
    ButtonsModule,
    InputsModule,
    DropDownsModule,
    DateInputsModule,
    ChartModule,
    MomentModule,
    RouterModule

  ],
  providers: [
  ],
  entryComponents: [UserListComponent],
  exports: []

})
export class BoardModule { }
