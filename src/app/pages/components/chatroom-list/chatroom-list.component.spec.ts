import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatroomListComponent } from './chatroom-list.component';
import { ChatroomService } from 'src/app/services/chatroom.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('ChatroomListComponent', () => {
  let component: ChatroomListComponent;
  let fixture: ComponentFixture<ChatroomListComponent>;
  let chatroomService: ChatroomService;
  let spy: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatroomListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    chatroomService = new ChatroomService(null, null, null);
    fixture = TestBed.createComponent(ChatroomListComponent);
    component = fixture.componentInstance;
    component.chatroomService = chatroomService;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should hide badge icon', () => {
    spy = spyOn(chatroomService, 'statArr').and.returnValue(
      of([{unread: false}])
    );
    expect(fixture.debugElement.query(By.css('.badge')).nativeElement).toBeUndefined();
    });
});
