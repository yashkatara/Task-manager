import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  tasks: any[] = [];
  selectedTask: any = null;
  filter: string = 'all';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe((data: any) => {
      this.tasks = data;
     
      if (this.filter !== 'all') {
        const isCompleted = this.filter === 'completed';
        this.tasks = this.tasks.filter((task) => task.completed === isCompleted);
      }
    });
  }

  addTask(): void {
    this.selectedTask = { title: '', description: '', completed:false };
  }

  editTask(task: any): void {
    this.selectedTask = { ...task };
  }

  saveTask(task: any): void {
    if (task.completed === false) {
        task.completed = 'pending';
    } else {
        task.completed = 'completed';
    }

    if (this.selectedTask._id) {
        this.taskService.updateTask(this.selectedTask._id, task).subscribe(() => this.loadTasks());
    } else {
        this.taskService.createTask(task).subscribe(() => this.loadTasks());
    }
    this.selectedTask = null;
}

  deleteTask(id: string): void {
    this.taskService.deleteTask(id).subscribe(() => this.loadTasks());
  }

  filterTasks(status: string): void {
    this.filter = status;
    this.loadTasks();
  }

  toggleTaskCompletion(task: any): void {
    this.saveTask({ ...task, completed: !task.completed });
  }
}
