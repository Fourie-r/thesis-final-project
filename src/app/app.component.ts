import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewChecked,
  ChangeDetectorRef,
  ViewChild
} from '@angular/core';
import { Alert } from './classes/alert';
import { AlertService } from './services/alert.service';
import { LoadingService } from './services/loading.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy, AfterViewChecked {
  private subscriptions: Subscription[] = [];
  public alerts: Array<Alert> = [];
  public loading = false;
  title = 'AngularMaterialGettingStarted';

  @ViewChild('drawer') drawer;
  isMenuOpen = true;
  contentMargin = 240;
  task: string[] = [
    'Clearning out my closet', 'Take out trash bins', 'Wash car', 'Tank up the motorcycles', 'Go for flight training'
  ];
  constructor(
    private alertService: AlertService,
    private loadingService: LoadingService,
    private cdRef: ChangeDetectorRef
  ) {}

  onToolbarMenuToggle() {
    console.log('On toolbar toggled', this.isMenuOpen);
    this.isMenuOpen = !this.isMenuOpen;

    if (!this.isMenuOpen) {
      this.contentMargin = 70;
    } else {
      this.contentMargin = 240;
    }
  }
  // sidenavEvents(str) {
  //   console.log(str);
  // }
  ngOnInit() {
    this.subscriptions.push(
      this.alertService.alerts.subscribe(alert => {
        this.alerts.push(alert);
      })
    );
  }

  toggle() {
    this.drawer.toggle();
  }

  ngAfterViewChecked() {
    this.subscriptions.push(
      this.loadingService.isLoading.subscribe(isLoading => {
        this.loading = isLoading;
        this.cdRef.detectChanges();
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
