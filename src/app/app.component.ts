import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [
    CommonModule,
    RouterModule,
    RouterOutlet,
    RouterLinkActive,
    FormsModule,
  ],
  standalone: true,
})
export class AppComponent {
  title = 'Angular Router App';
  name = 'John Doe';
}
