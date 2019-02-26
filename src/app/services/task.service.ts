import { Injectable } from '@angular/core';
import { TaskModel } from '../shared/models/tasks.model';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable()
export class TaskService {
  constructor(public db: AngularFirestore) {}

  getTasks(): Observable<any> {
    return this.db.collection('tasks').valueChanges();
  }

  getBacklogTasks(): Observable<any> {
    return this.db.collection('backlog').valueChanges();
  }

  addTasks(body: TaskModel) {
    const key = body.id || this.db.createId();
    const newTask = { id: key, ...body };
    return this.db
      .collection('tasks')
      .doc(key)
      .set(newTask)
      .catch(err => console.log(err));
  }

  updateTasks(id: string) {
    this.db
      .doc(`tasks/${id}`)
      .update({ destination: 'ToDo' })
      .catch(err => console.log(err));
  }

  upodateTaskDescription(id: string, text: string) {
    this.db
      .doc(`tasks/${id}`)
      .update({ title: text })
      .catch(err => console.log(err));
  }
  addTasksInProgress(id: string) {
    this.db
      .doc(`tasks/${id}`)
      .update({ destination: 'Progress' })
      .catch(err => console.log(err));
  }

  addTasksInCompleted(id: string) {
    this.db
      .doc(`tasks/${id}`)
      .update({ destination: 'Completed' })
      .catch(err => console.log(err));
  }

  moveToSprint(body: TaskModel) {
    this.removeTaskInBacklog(body.id);
    body.destination = 'ToDo';
    this.addTasks(body);
  }

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
