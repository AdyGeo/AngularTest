import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from './task';
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  priorityColors:any ={
    L:"bg-info",
    M:"bg-primary",
    H:"bg-danger"
  }

  @Input() task: Task = {
    id:0,
    priorityName: "",
    description: "",
    insdate: null,
    duedate: null,
    priority: "M",
    done: false
  };

  @Output() onMarkAsDoneTask: EventEmitter<Task> = new EventEmitter();
  @Output() onDeleteTask: EventEmitter<Task> = new EventEmitter();
  @Output() onShowModalTask: EventEmitter<Task> = new EventEmitter();


  constructor() { }

  ngOnInit(): void {
  }

  onMarkAsDone(task:Task){
    this.onMarkAsDoneTask.emit(task)
  }

  onDelete(task:Task){
    this.onDeleteTask.emit(task)
  }

  onShowModal(task:Task){
    this.onShowModalTask.emit(task);
  }

}
