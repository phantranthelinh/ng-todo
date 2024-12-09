import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService } from '../../../features/todo/services/todo.service';

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
