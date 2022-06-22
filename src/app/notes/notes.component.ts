import { Component, OnInit } from '@angular/core';
import { Note } from '../note/note';
import { NoteService } from '../note.service';
import { ModalService } from '../_modal';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  notes:Note[] = [];
  emptyNote:Note = {
    id: 0,
    title:"",
    description: "",
    insdate: null
  }
  activeNote:Note = this.emptyNote; 

  noteErrors:any = {
    descriptionError: "",
    titleError: ""
  };


  constructor(private modalService: ModalService, private noteService: NoteService) { }


  ngOnInit(): void {

    this.noteService.getNotes().subscribe(notes => this.notes = notes);
  }

  deleteNote(note:Note){
    this.noteService.deleteNote(note).subscribe((delN) => (this.notes = this.notes.filter(n => n.id !== delN.id)))
  }

  updateNote(note:Note){

    if(!note.title || !note.description){
      this.noteErrors.descriptionError = note.description ? "" : "Description cannot be blank.";
      this.noteErrors.titleError = note.title ? "" : "Title cannot be blank.";
      return
    }

    if(note.id){
      this.noteService.updateNote(note).subscribe((updN) => (this.notes.map((n,i) => {
        if(n.id === updN.id){
          this.notes[i] = updN;
        }
      })))
    }else{
      this.noteService.newNote(note).subscribe((newN) => (this.notes.push(newN)))
    }

    this.closeModal("noteModal");
    this.activeNote = this.emptyNote;
  }

  showModal(note:any){
    this.activeNote = note ? {...note} : {...this.emptyNote};
    this.noteErrors.descriptionError = "";
    this.noteErrors.titleError = "";
    this.openModal("noteModal");
  }
  
  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
      this.modalService.close(id);
  }

}
