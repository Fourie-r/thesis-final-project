// Imports
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { TaskModel } from '../shared/models/tasks.model';
import { ProgressTaskModel } from '../shared/models/progress-task.model';
import { CompletedTaskModel } from '../shared/models/completed-task.model';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection
} from '@angular/fire/firestore';

// Import RxJs required methods

@Injectable()
export class TaskService {
  private taskUrl = 'api/getTasks';
  private inProgressTaskUrl = 'api/inProgressTask';
  private completedTaskUrl = 'api/completedTask';
  // Resolve HTTP using the constructor
  constructor(private http: Http, public db: AngularFirestore) {}
  // private instance variable to hold base url

  // Fetch all existing task
  getTask(): Observable<TaskModel[]> {
    // Using get request
    return this.http.get(this.taskUrl).pipe(
      // ...and calling .json() on the response to return data
      map((res: Response) => {
        console.log(res.json());
        return res.json();
      }),
      // ...errors if any
      catchError((error: any) =>
        Observable.throw(error.json().error || 'Server error')
      )
    );
  }

  getTasks(): Observable<any> {
    return this.db.collection('tasks').valueChanges();
  }

  //  Fetch all in progress tasks
  getInProgressTask(): Observable<ProgressTaskModel[]> {
    // Using get request
    return this.http.get(this.inProgressTaskUrl).pipe(
      // ...and calling .json() on the response to return data
      map((res: Response) => res.json()),
      // ...errors if any
      catchError((error: any) =>
        Observable.throw(error.json().error || 'Server error')
      )
    );
  }

  getInProgressTasks(): Observable<any> {
    return this.db.collection('progressTasks').valueChanges();
  }
  // Fetch completed task
  /*  getCompletedTask(): Observable<CompletedTaskModel[]> {
    // Using get request
    return this.http.get(this.completedTaskUrl).pipe(
      // ...and calling .json() on the response to return data
      map((res: Response) => res.json()),
      // ...errors if any
      catchError((error: any) =>
        Observable.throw(error.json().error || 'Server error')
      )
    );
  } */

  getCompletedTasks(): Observable<any> {
    return this.db.collection('completedTasks').valueChanges();
  }

  getBacklogTasks(): Observable<any> {
    return this.db.collection('backlog').valueChanges();
  }

  //  Add New task
  addTask(body: Object): Observable<TaskModel[]> {
    // let bodyString = JSON.stringify(body); // Stringify payload
    const headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    const options = new RequestOptions({ headers: headers }); // Create a request option

    return this.http.post(this.taskUrl, body, options).pipe(
      // ...using post request
      map((res: Response) => res.json()), // ...and calling .json() on the response to return data
      catchError((error: any) =>
        Observable.throw(error.json().error || 'Server error')
      )
    ); // ...errors if any
  }

  addTasks(body: TaskModel) {
    const key = body.id || this.db.createId();
    const newTask = { id: key, ...body };
    return this.db
      .collection('tasks')
      .doc(key)
      .set(newTask)
      .catch(err => console.log(err));

    /*
    return this.db.collection('tasks').add(body)
    .catch(err => console.log(err)); */
  }

  //  Add task in-progress
  addTaskInProgress(body: Object): Observable<ProgressTaskModel[]> {
    // let bodyString = JSON.stringify(body); // Stringify payload
    const headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    const options = new RequestOptions({ headers: headers }); // Create a request option

    return this.http.post(this.inProgressTaskUrl, body, options).pipe(
      // ...using post request
      map((res: Response) => res.json()), // ...and calling .json() on the response to return data
      catchError((error: any) =>
        Observable.throw(error.json().error || 'Server error')
      )
    ); // ...errors if any
  }

  addTasksInProgress(body: TaskModel) {
    this.removeTasksInToDo(body.id);
    this.removeTasksInCompleted(body.id);

    return this.db
      .collection('progressTasks')
      .doc(body.id)
      .set(body)
      .catch(err => console.log(err));
  }

  //  Add task complete old version
  /* addTaskInComplete(body: Object): Observable<CompletedTaskModel[]> {
    // let bodyString = JSON.stringify(body); // Stringify payload
    const headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    const options = new RequestOptions({ headers: headers }); // Create a request option

    return this.http
      .post(this.completedTaskUrl, body, options).pipe( // ...using post request
      map((res: Response) => res.json()), // ...and calling .json() on the response to return data
      catchError((error: any) =>
        Observable.throw(error.json().error || 'Server error')
      )); // ...errors if any
  } */

  addTasksInCompleted(body: TaskModel) {
    console.log(body);
    this.removeTasksInProgress(body.id);
    this.removeTasksInToDo(body.id);

    return this.db
      .collection('completedTasks')
      .doc(body.id)
      .set(body)
      .catch(err => console.log(err));
  }

  moveToSprint(body: TaskModel) {

    this.removeTaskInBacklog(body.id);
    this.addTasks(body);
  }

  removeTasksInToDo(id: string) {
    this.db
      .collection('tasks')
      .doc(id)
      .ref.get()
      .then(querySnapshot => {
        querySnapshot.ref
          .delete()
          .then(() => {
            console.log('Document successfully deleted from ToDo tasks');
          })
          .catch(err => {
            console.error('Error removing document from ToDo tasks: ', err);
          });
      });
  }
  removeTasksInProgress(id: string) {
    this.db
      .collection('progressTasks')
      .doc(id)
      .ref.get()
      .then(querySnapshot => {
        querySnapshot.ref
          .delete()
          .then(() => {
            console.log('Document successfully deleted from progress Tasks');
          })
          .catch(err => {
            console.error('Error removing document from Progress Tasks: ', err);
          });
      });
  }

  removeTasksInCompleted(id: string) {
    this.db
      .collection('completedTasks')
      .doc(id)
      .ref.get()
      .then(querySnapshot => {
        querySnapshot.ref
          .delete()
          .then(() => {
            console.log('Document successfully deleted from Completed Tasks');
          })
          .catch(err => {
            console.error(
              'Error removing document from Completed Tasks: ',
              err
            );
          });
      });
  }

  removeTaskInBacklog(id: string) {
    this.db
      .collection('backlog')
      .doc(id)
      .ref.get()
      .then(querySnapshot => {
        querySnapshot.ref
          .delete()
          .then(() => {
            console.log('Document successfully deleted from Backlog');
          })
          .catch(err => 'Error removing document from Backlog');
      });
  }
}
