// System and Third-party
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { MaterialImportModule } from './imports/material';

import { ServiceWorkerModule } from '@angular/service-worker';
import { NgxImageCompressService } from 'ngx-image-compress';
// import { QuillModule } from 'ngx-quill';

// Shared App
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NavComponent } from './components/layout/nav/nav.component';

// Pages
import { ChatComponent } from './components/pages/chat/chat.component';
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

// Admin
import { MessageCenterComponent } from './components/admin/message-center/message-center.component';

// Forms
import { AddPhotoFormComponent } from './components/forms/add-photo-form/add-photo-form.component';
import { ChatFormComponent } from './components/forms/chat-form/chat-form.component';
import { EmailFormComponent } from './components/forms/email-form/email-form.component';
import { EventFormComponent } from './components/forms/event-form/event-form.component';
import { GroupFormComponent } from './components/forms/group-form/group-form.component';
import { MeFormComponent } from './components/forms/me-form/me-form.component';
import { PostFormComponent } from './components/forms/post-form/post-form.component';
import { TaskFormComponent } from './components/forms/task-form/task-form.component';
import { TextFormComponent } from './components/forms/text-form/text-form.component';

// Widgets
import { MapComponent } from './components/widgets/map/map.component';
import { PostsComponent } from './components/widgets/posts/posts.component';

// Directives
import { AutofocusDirective } from './directives/autofocus/autofocus.directive';

// Ngxs states
import { ChatState } from './store/chat/chat.state';
import { EventState } from './store/event/event.state';
import { GacState } from './store/gac/gac.state';
import { GroupState } from './store/group/group.state';
import { LocationState } from './store/location/location.state';
import { MapState } from './store/map/map.state';
import { MessageState } from './store/message/message.state';
import { NotificationState } from './store/notification/notification.state';
import { PostState } from './store/post/post.state';
import { UserState } from './store/user/user.state';

// Services
import { MapService } from './services/map/map.service';


@NgModule({
  // Components are declared
  declarations: [
    AddPhotoFormComponent,
    AppComponent,
    AutofocusDirective,
    ChatComponent,
    ChatFormComponent,
    ChatsComponent,
    DashComponent,
    EmailFormComponent,
    EventComponent,
    EventFormComponent,
    EventsComponent,
    GroupComponent,
    GroupFormComponent,
    GroupsComponent,
    HomeComponent,
    MapComponent,
    MeFormComponent,
    MessageCenterComponent,
    MessageComponent,
    MessagesComponent,
    NavComponent,
    NotificationsComponent,
    PostComponent,
    PostsComponent,
    PostFormComponent,
    TaskComponent,
    TaskFormComponent,
    TasksComponent,
    TextFormComponent,
    UserComponent,
  ],
  // Modules are imported
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,

    // Material Design Components
    MaterialImportModule,

    // Store
    NgxsModule.forRoot([
      ChatState,
      EventState,
      GacState,
      GroupState,
      LocationState,
      MapState,
      MessageState,
      NotificationState,
      PostState,
      UserState,
    ], {
        developmentMode: !environment.production,
        selectorOptions: {
          suppressErrors: true,
          injectContainerState: false
        }
    }),
    NgxsReduxDevtoolsPluginModule.forRoot(),

    // Quill wysywig -- Note: weird errors so don't use for now.
    // QuillModule.forRoot(),

    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })

  ],
  // Services are provided
  providers: [
    MapService,
    NgxImageCompressService,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
