import { User } from './../../../classes/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatMessageComponent } from './chat-message.component';
import { of } from 'rxjs';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('ChatMessageComponent', () => {
  let component: ChatMessageComponent;
  let spy: any;
  let fixture: ComponentFixture<ChatMessageComponent>;
  let authService: AuthService;

  beforeEach(async(() => {
    /* authService = new AuthService(null, null, null, null, null); */
    TestBed.configureTestingModule({
      declarations: [ChatMessageComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    authService = new AuthService(null, null, null, null, null);
    fixture = TestBed.createComponent(ChatMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the authenticated user', () => {
    spy = spyOn(authService, 'currentUser').and.returnValue(
      of({ emial: 'ivann4o@abv.bg' } as User)
    );
    component.userEmail = 'ivann4o@abv.bg';
    expect(component.isOwnMessage).toBeTruthy();
  });

  it('should get personolized styling', () => {
    spy = spyOn(authService, 'currentUser').and.returnValue(
      of({ emial: 'ivann4o@abv.bg' } as User)
    );
    component.userEmail = 'ivann4o@abv.bg';
    fixture.debugElement.query(By.css('isOwnMessage'));
  });
});
