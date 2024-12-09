import { ChangeDetectionStrategy, Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-notification-button',
  imports: [],
  templateUrl: './notification-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationButtonComponent {
  count = input(0);
  // @Input() count: any = 0
 
}
