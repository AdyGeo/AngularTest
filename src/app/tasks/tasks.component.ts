import { Component, OnInit } from '@angular/core';
import { takeLast } from 'rxjs';
import { TaskService } from '../task.service';
import { Task } from '../task/task';

import { ModalService } from '../_modal';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  emptyTask:Task = {
    id:0,
    priorityName: "",
    description: "",
    insdate: null,
    duedate: null,
    priority: "M",
    done: false
  };
  

  activeTask:Task = this.emptyTask;
  taskErrors:any = {
    descriptionError: ""
  };

  tasks: Task[] = [];

  constructor(private modalService: ModalService, private taskService: TaskService) { }

  ngOnInit(): void {

    this.taskService.getTasks().subscribe((tasks) => (this.tasks = tasks));
  }

  markAsDone(task:Task){
    this.taskService.markAsDone(task).subscribe((newT) => (this.tasks.map(t => {
      if(t.id === newT.id){
        t.done = newT.done
      }
    })))
  }

  deleteTask(task:Task){
    this.taskService.deleteTask(task).subscribe((delT) => (this.tasks = this.tasks.filter(t => t.id !== delT.id)))
  }

  updateTask(task:Task){

    task.duedate = task.duedate? task.duedate : null;
    task.priority = task.priority? task.priority : "M";

    if(!task.description){
      this.taskErrors.descriptionError = "Description cannot be blank.";
      return
    }

    if(task.id){
      this.taskService.updateTask(task).subscribe((updT) => (this.tasks.map((t,i) => {
        if(t.id === updT.id){
          this.tasks[i] = updT;
        }
      })))
    }else{
      this.taskService.newTask(task).subscribe((newT) => (this.tasks.push(newT)))
    }

    this.closeModal("taskModal");
    this.activeTask = this.emptyTask;
  }

  showModal(task:any){
    this.activeTask = task ? {...task} : {...this.emptyTask};
    this.taskErrors.descriptionError = "";
    this.openModal("taskModal");
  }
  
  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
      this.modalService.close(id);
  }

}
