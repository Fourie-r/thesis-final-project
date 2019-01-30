import { Injectable } from '@angular/core';
import { Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  public isLoading: Subject<boolean> = new Subject();
  public drawer: Subject<any> = new Subject();

  constructor() { }
}
