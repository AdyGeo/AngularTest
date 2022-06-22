import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksComponent } from './tasks/tasks.component';
import { NotesComponent } from './notes/notes.component';

const routes: Routes = [
  { path: '',
    component: TasksComponent,
  },
  {
    path: 'tasks', // child route path
    component: TasksComponent, // child route component that the router renders
  },  
  {
    path: 'notes', // child route path
    component: NotesComponent, // child route component that the router renders
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }

