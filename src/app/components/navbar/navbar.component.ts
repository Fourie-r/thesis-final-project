import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public currentUser: any = null;
  @Input() drawer;
  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.authService.currentUser.subscribe( user => this.currentUser = user);
  }

  public logout(): void {
    this.authService.logout();
  }
  toggle() {
    this.drawer.toggle();
  }
}
