import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Note } from './note';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  @Input() note: Note = {
    id: 0,
    title:"",
    description: "",
    insdate: null
  };

  @Output() onDeleteNote: EventEmitter<Note> = new EventEmitter();
  @Output() onShowModalNote: EventEmitter<Note> = new EventEmitter();


  constructor() { }

  ngOnInit(): void {
  }

  
  onDelete(note:Note){
    this.onDeleteNote.emit(note)
  }

  onShowModal(note:Note){
    this.onShowModalNote.emit(note);
  }


}
