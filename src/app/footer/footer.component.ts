import { Component, inject } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer, [app-footer]',
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  host:{
    class: "w-full flex justify-between pt-10 items-center"
  }
})
export class FooterComponent {
  service = inject(TodoService)
}
