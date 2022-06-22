import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../task/task';

@Component({
  selector: 'app-modal-task',
  templateUrl: './modal-task.component.html',
  styleUrls: ['./modal-task.component.css']
})
export class ModalTaskComponent implements OnInit {

  @Input() activeTask:Task = {
    id:0,
    priorityName: "",
    description: "",
    insdate: "",
    duedate: "",
    priority: "",
    done: false
  };

  @Input() taskErrors:any = {
    descriptionError: ""
  };

  @Output() onUpdateTask: EventEmitter<Task> = new EventEmitter();
  @Output() onCloseModalTask: EventEmitter<string> = new EventEmitter();


  constructor() { }

  ngOnInit(): void {
  }

  onUpdate(task:Task){
    this.onUpdateTask.emit(task);
  }

  onCloseModal(modal:string){
    this.onCloseModalTask.emit(modal);
  }

}
