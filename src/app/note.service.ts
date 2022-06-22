import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Note } from './note/note';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private http:HttpClient) { }

  private apiUrl = 'http://localhost:8000/api/notes/'

  getNotes():Observable<Note[]>{
    return this.http.get<Note[]>(this.apiUrl);
  }

  deleteNote(note: Note): Observable<Note>{
    const url = `${this.apiUrl}${note.id}/`;
    return this.http.delete<Note>(url, httpOptions);
  }

  updateNote(note: Note): Observable<Note>{
    const url = `${this.apiUrl}${note.id}/`;
    return this.http.put<Note>(url, note, httpOptions);
  }

  newNote(note: Note): Observable<Note>{
    const url = this.apiUrl;
    return this.http.post<Note>(url, note, httpOptions);
  }
}
