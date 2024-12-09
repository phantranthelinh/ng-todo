import { Routes } from '@angular/router';
import { FormComponent } from './features/form/src/form.component';
import { NotificationContainerComponent } from './notification-container/notification-container.component';
import { TodoComponent } from './todo/todo.component';

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

    }
];
