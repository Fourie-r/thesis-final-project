// Imports
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { TaskContributionModel } from '../shared/models/task-contribution.model';
import { Observable } from 'rxjs';
import { map, catchError} from 'rxjs/operators';

@Injectable()
export class TaskContributionService {
  private taskContributionUrl = 'api/taskContribution';

  // Resolve HTTP using the constructor
  constructor(private http: Http) { }
  // private instance variable to hold base url

  // Fetch all existing skills
  getTaskContribution(): Observable<TaskContributionModel[]> {

    // Using get request
    return this.http.get(this.taskContributionUrl).pipe(
      // ...and calling .json() on the response to return data
      map((res: Response) => res.json()),
      // ...errors if any
      catchError((error: any) => Observable.throw(error.json().error || 'Server error')));

  }

}
