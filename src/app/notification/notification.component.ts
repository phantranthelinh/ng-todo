import { ChangeDetectionStrategy, Component, EventEmitter, Input, model, Output } from '@angular/core';

@Component({
  selector: 'app-notification',
  imports: [],
  templateUrl: './notification.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class NotificationComponent {
  count = model(0);
  // @Input() count: any = 0;
  // @Output() newValue = new EventEmitter<number>();
  addNotification() {
    // this.count +=1;
    // this.newValue.emit(this.count)
   this.count.update(count => count + 1);
  }

  removeNotification() {
    if (this.count() === 0) {
      return;
    }
    this.count.update(count => count - 1);
    // if (this.count === 0) {
    //   return;
    // }
    // this.count -=1;
  }

  resetCount() {
    this.count.set(0);

    // this.count = 0
  }
}
