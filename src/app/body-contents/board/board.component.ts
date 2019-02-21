import { Component, OnInit, Input, ViewContainerRef } from '@angular/core';
import { EmitterService } from './../../services/emitter.service';

import { TaskModel } from './../../shared/models/tasks.model';
import { TaskService } from './../../services/task.service';
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
  listTeamOne: TaskModel[] = [];
  listTeamTwo: TaskModel[] = [];
  public opened = false;
  private taskId = '';

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
      (tasks: TaskModel[]) => {
        console.log(' GETTING TASKS');
        this.tasks = [];
        this.listTeamOne = [];
        this.listTeamTwo = [];
        console.log(tasks);
        tasks.forEach(task => {
          if (task.destination === 'ToDo') {
            this.tasks.push(task);
          }

          if (task.destination === 'Progress') {
            this.listTeamOne.push(task);
          }

          if (task.destination === 'Completed') {
            this.listTeamTwo.push(task);
          }
        });
        this.pieData[0].value = this.listTeamOne.length;
        this.pieData[1].value = this.listTeamTwo.length;

        this.pieData = [
          { category: 'In Progress', value: this.listTeamOne.length },
          { category: 'Completed', value: this.listTeamTwo.length }
        ];
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
      this.taskService.updateTasks(item.id);
    }
    if (data === 'Progress') {
      this.taskService.addTasksInProgress(item.id);
    }

    if (data === 'Completed') {
      this.taskService.addTasksInCompleted(item.id);
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
    this.taskId = task.id;

  }
  public close() {
    this.opened = false;
  }

  updateTitle() {
    this.taskService.upodateTaskDescription( this.taskId, this.seletedTaskTitle);
    this.close();
  }

  saveToBacklog() {
    this.deleteTask();
    this.taskService.db
      .collection('backlog')
      .doc(this.selectedTask.id)
      .set(this.selectedTask);

    this.close();
  }

  deleteTask() {
    console.log(this.selectedTaskData);
    this.taskService.removeTask(this.selectedTask.id);
    this.close();
  }
}
