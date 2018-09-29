import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public currentUser: any = null;

  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.authService.currentUser.subscribe( user => this.currentUser = user);
  }

  public logout(): void {
    this.authService.logout();
  }

}
