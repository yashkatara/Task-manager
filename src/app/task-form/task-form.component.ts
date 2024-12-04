import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {
  @Input() task: any = { title: '', description: '', completed: false };
  @Output() onSave = new EventEmitter<any>();

  saveTask() {
    this.onSave.emit(this.task);
  }
}
