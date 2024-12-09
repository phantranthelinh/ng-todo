import { Component, signal } from '@angular/core';
import { NotificationButtonComponent } from "../notification-button/notification-button.component";
import { NotificationComponent } from "../notification/notification.component";

@Component({
  selector: 'app-notification-container',
  imports: [NotificationButtonComponent, NotificationComponent],
  templateUrl: './notification-container.component.html',
})
export class NotificationContainerComponent {
  appTitle = 'Angular Model Inputs';
  notificationsCount = signal(10);
  // notificationsCount = 10;

  

}
