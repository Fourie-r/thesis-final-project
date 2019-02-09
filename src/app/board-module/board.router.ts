import { Routes, RouterModule } from '@angular/router';
import { BoardComponent } from '../body-contents/board/board.component';
import { BodyContentsComponent } from '../body-contents/body-contents.component';
import { BacklogComponent } from '../pages/backlog/backlog-component';
import { AuthGuard } from '../guards/auth.guard';
import { ChatComponent } from '../pages/chat/chat.component';

const BOARD_ROUTER: Routes = [
  {
    path: '',
    component: BodyContentsComponent
  },
  { path: 'backlog', component: BacklogComponent },
  {
    path: 'chat', canActivate: [AuthGuard],
    children: [
      { path: '', component: ChatComponent }]
  },
  { path: '**', redirectTo: '/login' }
];

export const boardRouter = RouterModule.forChild(BOARD_ROUTER);
