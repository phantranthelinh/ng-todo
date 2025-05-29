import { Routes } from '@angular/router';
import { FormComponent } from './features/form/src/form.component';
import { NotificationContainerComponent } from './features/notification/notification-container/notification-container.component';
import { Tabs } from './features/tabs/tabs.component';
import { TodoComponent } from './features/todo/todo.component';
import { ReuseFormComponent } from './features/reuse-form/form.component';

export const routes: Routes = [
  {
    path: '',
    component: TodoComponent,
  },
  {
    path: 'form',
    component: FormComponent,
  },
  {
    path: 'notification',
    component: NotificationContainerComponent,
  },
  {
    path: 'tabs',
    component: Tabs,
  },
  {
    path: 'reuse-form',
    component: ReuseFormComponent,
  },
];
