import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Task } from './task/task';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = 'http://localhost:8000/api/tasks/'

  constructor(private http:HttpClient) { }

  getTasks():Observable<Task[]>{
    return this.http.get<Task[]>(this.apiUrl);
  }

  markAsDone(task: Task): Observable<Task>{
    const url = `http://localhost:8000/api/complete-task/${task.id}/`;
    return this.http.put<Task>(url, {done:!task.done}, httpOptions);
  }

  deleteTask(task: Task): Observable<Task>{
    const url = `${this.apiUrl}${task.id}/`;
    return this.http.delete<Task>(url, httpOptions);
  }

  updateTask(task: Task): Observable<Task>{
    const url = `${this.apiUrl}${task.id}/`;
    return this.http.put<Task>(url, task, httpOptions);
  }

  newTask(task: Task): Observable<Task>{
    const url = this.apiUrl;
    return this.http.post<Task>(url, task, httpOptions);
  }
}
