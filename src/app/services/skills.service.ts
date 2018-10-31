// Imports
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { SkillModel } from '../shared/models/skills.model';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


@Injectable()
export class SkillsService {
  private skillsUrl = 'api/getSkills';

  // Resolve HTTP using the constructor
  constructor(private http: Http) {}
  // private instance variable to hold base url

  // Fetch all existing skills
  getSkills(): Observable<SkillModel[]> {
    // Using get request
    return (
      this.http
        .get(this.skillsUrl).pipe(
        // ...and calling .json() on the response to return data
        map((res: Response) => res.json()),
        // ...errors if any
        catchError((error: any) =>
          Observable.throw(error.json().error || 'Server error')
        )
    ));
  }
}
