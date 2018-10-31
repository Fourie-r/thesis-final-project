import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { NgModule } from '@angular/core';
import { AlertModule } from 'ngx-bootstrap';
import { NgxLoadingModule } from 'ngx-loading';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import 'hammerjs';

// Kendo Ui Modules
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { ChartModule } from '@progress/kendo-angular-charts';

import { DndModule } from 'ng2-dnd';
import { MomentModule } from 'angular2-moment';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { MockData } from './services/in-memory-data.service';



import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';


import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ChatComponent } from './pages/chat/chat.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ChatInputComponent } from './pages/components/chat-input/chat-input.component';
import { ChatroomListComponent } from './pages/components/chatroom-list/chatroom-list.component';
import { ChatroomTitleBarComponent } from './pages/components/chatroom-title-bar/chatroom-title-bar.component';
import { ChatMessageComponent } from './pages/components/chat-message/chat-message.component';
import { ChatroomWindowComponent } from './pages/components/chatroom-window/chatroom-window.component';
import { BodyContentsComponent } from './body-contents/body-contents.component';
import { PeoplesComponent } from './body-contents/peoples/peoples.component';
import { AddTaskComponent } from './body-contents/add-task/add-task.component';
import { BoardComponent } from './body-contents/board/board.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { firebase } from '../environments/environment';

// services
import { EmitterService } from './services/emitter.service';
import { PeoplesService } from './services/peoples.service';
import { TaskService } from './services/task.service';
import { SkillsService } from './services/skills.service';
import { TaskContributionService } from './services/task-contribution.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ChatComponent,
    NavbarComponent,
    ChatInputComponent,
    ChatroomListComponent,
    ChatroomTitleBarComponent,
    ChatMessageComponent,
    ChatroomWindowComponent,
    BodyContentsComponent,
    PeoplesComponent,
    AddTaskComponent,
    BoardComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AlertModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    NgxLoadingModule.forRoot({}),
    AngularFireAuthModule,
    AngularFireModule.initializeApp(firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    InMemoryWebApiModule.forRoot(MockData),
    MomentModule,
    DndModule.forRoot(),
    DialogModule,
    ButtonsModule,
    InputsModule,
    DropDownsModule,
    DateInputsModule,
    ChartModule,
    HttpModule
  ],
  providers: [
    EmitterService,
    PeoplesService,
    TaskService,
    SkillsService,
    TaskContributionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
