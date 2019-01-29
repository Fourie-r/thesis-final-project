import { Component, OnInit, Input, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs';
import { EmitterService } from './../../services/emitter.service';

import { TaskModel } from './../../shared/models/tasks.model';
import { ProgressTaskModel } from './../../shared/models/progress-task.model';
import { CompletedTaskModel } from './../../shared/models/completed-task.model';
import { TaskService } from './../../services/task.service';
import { PeoplesModel } from './../../shared/models/peoples.model';
import { PeoplesService } from './../../services/peoples.service';
import { User } from 'src/app/classes/user.model';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  tasks: TaskModel[] = [];
  peoples: User[] = [];
  emitter = EmitterService.get('PeoplesChannel');
  listTeamOne: ProgressTaskModel[] = [];
  listTeamTwo: CompletedTaskModel[] = [];
  public opened = false;

  public pieData: any = [
    { category: 'In Progress', value: 2 },
    { category: 'Completed', value: 2 }
  ];

  private selectedTask: TaskModel = {};
  private selectedTaskData: string;
  public seletedTaskTitle: string;
  public selectedTaskStartDate: string;
  public selectedTaskEndDate: string;
  public seletedTaskPeople: string;


  constructor(
    public taskService: TaskService,
    public peoplesService: PeoplesService,
    vcr: ViewContainerRef
  ) {}

  ngOnInit() {
    this.getAllPeople();
    this.getAllTasks();
    this.getAllCompletedTask();
    this.getAllInProgressTask();

    this.emitter.subscribe(msg => {
      if (msg.msg === 'BroadcastTask') {
        this.tasks.push(msg.data);
      }
    });
  }

  // Get all tasks
  getAllTasks() {
    // Get all tasks
    this.taskService.getTasks().subscribe(
      tasks => {
        console.log(tasks);
        this.tasks = tasks;
      },
      err => {
        // Log errors if any
        console.log(err);
      }
    );
  }

  // Get ALl Completed Task
  getAllCompletedTask() {
    this.taskService.getCompletedTasks().subscribe(
      tasks => {
        this.listTeamTwo = tasks;
      },
      err => {
        // Log errors if any
        console.log(err);
      }
    );
  }

  // Get ALl in-progress Task
  getAllInProgressTask() {
    this.taskService.getInProgressTasks().subscribe(
      tasks => {
        this.listTeamOne = tasks;
      },
      err => {
        // Log errors if any
        console.log(err);
      }
    );
  }

  // Get all peoples
  getAllPeople() {
    // Get all peoples
    this.peoplesService.getPeople().subscribe(
      peoples => {

        this.peoples = peoples;
        console.log(peoples);
      },
      err => {
        // Log errors if any
        console.log(err);
      }
    );
  }

  // Drop on success
  addTo(event: any, item, data) {
    console.log(item);
    console.log(data);
    if (data === 'ToDo') {
      // this.toastr.success('Task ' + item.title + ' added in To Do board!');
    }
    if (data === 'Progress') {
      const object = {
        id: item.id,
        title: item.title,
        people: item.people,
        skills: item.skills,
        startDate: item.startDate,
        endDate: item.endDate,
        start: item.startDate,
        end: item.endDate,
        backgroundColor: '#dff0d8'
      };

      this.taskService.addTasksInProgress(object);

      /*
      // Subscribe to observable
      taskOperation.subscribe(
        task => {
          // this.listTeamOne.push(object);
          // this.toastr.success('Task ' + item.title + ' added in Progress board!');
        },
        err => {
          // Log errors if any
          console.log(err);
        }
      ); */

    }

    if (data === 'Completed') {
      const object = {
        id: item.id,
        title: item.title,
        people: item.people,
        skills: item.skills,
        startDate: item.startDate,
        endDate: item.endDate,
        start: item.startDate,
        end: item.endDate,
        backgroundColor: '#d9edf7'
      };

      this.taskService.addTasksInCompleted(object);
      /*
      // Subscribe to observable
      taskOperation.subscribe(
        task => {
          // this.listTeamTwo.push(object);
          // this.toastr.success('Task ' + item.title + ' added in Completed!');
        },
        err => {
          // Log errors if any
          console.log(err);
        }
      ); */
    }
    this.pieData[0].value = this.listTeamOne.length;
    this.pieData[1].value = this.listTeamTwo.length;

    this.pieData = [
      { category: 'In Progress', value: this.listTeamOne.length },
      { category: 'Completed', value: this.listTeamTwo.length }
    ];
  }

  // Open Task Popup details
  openTask(task, data: string) {
    this.opened = true;
    console.log(task);
    this.selectedTask = task;
    this.seletedTaskTitle = task.title;
    this.selectedTaskStartDate = task.startDate;
    this.selectedTaskEndDate = task.endDate;
    this.seletedTaskPeople = task.people;
    this.selectedTaskData = data;
  }
  public close() {
    this.opened = false;
  }

  saveToBacklog() {

    this.deleteTask();
    this.taskService.db.collection('backlog').doc(this.selectedTask.id).set(this.selectedTask);

    this.close();
  }

  deleteTask() {
    console.log(this.selectedTaskData);
    if (this.selectedTaskData === 'ToDo') {

      this.taskService.removeTasksInToDo(this.selectedTask.id);
    }

    if (this.selectedTaskData === 'Progress') {

      this.taskService.removeTasksInProgress(this.selectedTask.id);

    }
    if (this.selectedTaskData === 'Completed') {

      this.taskService.removeTasksInCompleted(this.selectedTask.id);
    }
    this.close();
  }
}
