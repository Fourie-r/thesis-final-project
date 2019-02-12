import { Component, OnInit, Output, EventEmitter, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs';
import { EmitterService } from './../../services/emitter.service';

import { PeoplesModel } from './../../shared/models/peoples.model';
import { PeoplesService } from './../../services/peoples.service';

import { SkillModel } from './../../shared/models/skills.model';
import { SkillsService } from './../../services/skills.service';

import { TaskModel } from './../../shared/models/tasks.model';
import { TaskService } from './../../services/task.service';
import { User } from 'src/app/classes/user.model';


@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

  emitter = EmitterService.get('PeoplesChannel');

  peoples: User[] = [];
  skills: SkillModel[] = [];
  tasks: TaskModel[] = [];

  public startDate: Date = new Date();
  public endDate: Date = new Date();

  title: string;
  public selectedSkills;
  public selectedPeople = 2;

  constructor(
    public peoplesService: PeoplesService,
    public skillsService: SkillsService,
    public taskService: TaskService,
    vcr: ViewContainerRef) {
    // this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.getAllPeople();
    this.getAllSkills();

    this.emitter.subscribe(msg => {
      this.getAllPeople();
    });
  }

  showSuccess() {
    // this.toastr.success('You are awesome!', 'Success!');
  }

  getAllPeople() {
    // Get all peoples
    this.peoplesService.getPeople()
      .subscribe(
        peoples => {
          this.peoples = peoples;
        },
        err => {
          // Log errors if any
          console.log(err);
        });
  }

  getAllSkills() {
    // Get all skills
    this.skillsService.getSkills()
      .subscribe(
        skills => {
          this.skills = skills;
        },
        err => {
          // Log errors if any
          console.log(err);
        });
  }

  addTask() {
    const taskObject = {
      title: this.title,
      people: this.selectedPeople,
      skills: this.selectedSkills,
      startDate: this.startDate,
      endDate: this.endDate,
      start: this.startDate,
      end: this.endDate,
      backgroundColor: '#fcf8e3'
    };

    this.title = null;
    this.selectedPeople = null;
    this.selectedSkills = null;
    this.startDate = null;
    this.endDate = null;

    this.taskService.addTasks(taskObject);
  }
}
