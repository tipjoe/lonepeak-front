import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Pages
import { ChatsComponent } from './components/pages/chats/chats.component';
import { DashComponent } from './components/pages/dash/dash.component';
import { EventComponent } from './components/pages/event/event.component';
import { EventsComponent } from './components/pages/events/events.component';
import { GroupComponent } from './components/pages/group/group.component';
import { GroupsComponent } from './components/pages/groups/groups.component';
import { HomeComponent } from './components/pages/home/home.component';
import { MessageComponent } from './components/pages/message/message.component';
import { MessagesComponent } from './components/pages/messages/messages.component';
import { NotificationsComponent } from './components/pages/notifications/notifications.component';
import { PostComponent } from './components/pages/post/post.component';
import { TaskComponent } from './components/pages/task/task.component';
import { TasksComponent } from './components/pages/tasks/tasks.component';
import { UserComponent } from './components/pages/user/user.component';
import { RegistrationComponent } from './components/pages/registration/registration.component';

// For testing only -- remove when done.
import { MapComponent } from './components/widgets/map/map.component';

// Admin
import { MessageCenterComponent } from './components/admin/message-center/message-center.component';

// Forms
import { EmailFormComponent } from './components/forms/email-form/email-form.component';
import { EventFormComponent } from './components/forms/event-form/event-form.component';
import { GroupFormComponent } from './components/forms/group-form/group-form.component';
import { MeFormComponent } from './components/forms/me-form/me-form.component';
// import { PostFormComponent } from './components/forms/post-form/post-form.component';
import { TaskFormComponent } from './components/forms/task-form/task-form.component';
import { TextFormComponent } from './components/forms/text-form/text-form.component';
import { AdminContactComponent } from './components/forms/admin-contact-form/admin-contact-form.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'crapdash', component: DashComponent },
  { path: 'event', component: EventComponent },
  { path: 'events', component: EventsComponent },
  { path: 'group', component: GroupComponent },
  { path: 'groups', component: GroupsComponent },
  { path: 'home', component: HomeComponent },
  { path: 'map', component: MapComponent },
  { path: 'message', component: MessageComponent },
  { path: 'messages', component: MessagesComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: 'post', component: PostComponent },
  // { path: 'add-post', component: PostFormComponent },
  { path: 'task', component: TaskComponent },
  { path: 'tasks', component: TasksComponent },
  { path: 'user', component: UserComponent },
  { path: 'contact', component: AdminContactComponent },
  { path: 'registration', component: RegistrationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
