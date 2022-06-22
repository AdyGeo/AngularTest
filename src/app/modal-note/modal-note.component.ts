import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Note } from '../note/note';

@Component({
  selector: 'app-modal-note',
  templateUrl: './modal-note.component.html',
  styleUrls: ['./modal-note.component.css']
})
export class ModalNoteComponent implements OnInit {

  constructor() { }

  @Input() activeNote:Note={
      id: 0,
      title:"",
      description: "",
      insdate: null
  }

  @Input() noteErrors:any = {
    descriptionError: "",
    titleError:""
  };


  @Output() onUpdateNote: EventEmitter<Note> = new EventEmitter();
  @Output() onCloseModalNote: EventEmitter<string> = new EventEmitter();


  ngOnInit(): void {
  }

  onUpdate(note:Note){
    this.onUpdateNote.emit(note);
  }

  onCloseModal(modal:string){
    this.onCloseModalNote.emit(modal);
  }
}
