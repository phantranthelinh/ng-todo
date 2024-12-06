import { Component, inject } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { FilterType, ToDoItem } from '../types';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-todo',
  imports: [CommonModule, FooterComponent],
  templateUrl: './todo.component.html',
  providers: [TodoService],
})
export class TodoComponent {
  title = 'todo';
  todoService = inject(TodoService);
  vm$ = this.todoService.vm$

  setFilter(filter: FilterType) {
    this.todoService.setFilter(filter);
  }

  toggleTodo(todo: ToDoItem) {
    this.todoService.toggle(todo);
  }

  addTodo(event: HTMLInputElement) {
    this.todoService.addItem(event.value);
    event.value = '';
  }


  ngOnInit(): void {
    this.todoService.fetchData();   
  }

  clear() {
    this.todoService.clear();
  }
}
