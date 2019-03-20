import { Injectable } from '@angular/core';
import { TaskModel } from '../shared/models/tasks.model';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../classes/user.model';

@Injectable()
export class TaskService {
  constructor(public db: AngularFirestore) {}

  // gets all tasks from Firebase
  getTasks(): Observable<any> {
    return this.db.collection('tasks').valueChanges();
  }
  // gets a single user from Firebase
  getUser(id: string): Observable<User> {
    return this.db.doc(`users/${id}`).valueChanges();
  }

  // gets all backlog tasks
  getBacklogTasks(): Observable<any> {
    return this.db.collection('backlog').valueChanges();
  }

  // adds a new task to the collection
  addTasks(body: TaskModel) {
    const key = body.id || this.db.createId();
    const newTask = { id: key, ...body };
    return this.db
      .collection('tasks')
      .doc(key)
      .set(newTask)
      .catch(err => console.log(err));
  }

  // sends a task to the ToDo column
  updateTasks(id: string) {
    this.db
      .doc(`tasks/${id}`)
      .update({ destination: 'ToDo' })
      .catch(err => console.log(err));
  }

  // edits a task
  upodateTaskDescription(id: string, text: string) {
    this.db
      .doc(`tasks/${id}`)
      .update({ title: text })
      .catch(err => console.log(err));
  }
  // moves task to the InProgress column
  addTasksInProgress(id: string) {
    this.db
      .doc(`tasks/${id}`)
      .update({ destination: 'Progress' })
      .catch(err => console.log(err));
  }

  // moves task to the Completed column
  addTasksInCompleted(id: string) {
    this.db
      .doc(`tasks/${id}`)
      .update({ destination: 'Completed' })
      .catch(err => console.log(err));
  }

  // moves task to Sprint
  moveToSprint(body: TaskModel) {
    this.removeTaskInBacklog(body.id);
    body.destination = 'ToDo';
    this.addTasks(body);
  }

  // deletes a task
  removeTask(id: string) {
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

  // removes task from backlog
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
          .catch(err =>
            console.log('Error removing document from Backlog', err)
          );
      });
  }
}
