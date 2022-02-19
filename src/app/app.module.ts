// System and Third-party
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MaterialImportModule } from './imports/material';

import { ServiceWorkerModule } from '@angular/service-worker';
import { NgxImageCompressService } from 'ngx-image-compress';
// import { QuillModule } from 'ngx-quill';

// Interceptors
import { WithCredentialsInterceptor } from './interceptors/with-credentials';

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

// Ngxs states -- most entities should extend EntityState.
// Don't import (EntityState) here. Use it like an abstract class and only
// import those that extend it.
// import { EntityState } from './store/entity/entity.state';

import { ChatState } from './store/chat/chat.state';
import { EventState } from './store/event/event.state';
import { GacState } from './store/gac/gac.state';
import { GroupState } from './store/group/group.state';
import { LocationState } from './store/location/location.state';
import { MessageState } from './store/message/message.state';
import { NotificationState } from './store/notification/notification.state';
import { PostState } from './store/post/post.state';
import { RoadState } from './store/road/road.state';
import { UserState } from './store/user/user.state';

// Internal Services
// App-based services are made available globally with the
// @Injectable({providedIn: root}) decorator. See `providers` below for more.

// @NgModule is a decorator function that takes an object with defined
// properties (like `declarations`, `imports`, etc.) that describe how
// to configure and instantiate the module when it `bootstraps`.
// See https://angular.io/guide/architecture-modules
@NgModule({
  // Components (a type of directive), Directives, and Pipes are declared
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
    // Set's up common global providers for any browser-based app.
    // BrowserModule should only be registered here in app.module. Other
    // modules can import CommonModule, a subset of this.
    BrowserModule,
    HttpClientModule,

    // Material Design Components
    MaterialImportModule,

    // Ngxs Store
    // `forRoot
    // See https://angular.io/guide/singleton-services#the-forroot-pattern
    //
    // forRoot contains configurations for a module and globally instantiates
    // the module as a singleton (only one instance in the application).
    NgxsModule.forRoot([
      ChatState,
      EventState,
      GacState,
      GroupState,
      LocationState,
      RoadState,
      MessageState,
      NotificationState,
      PostState,
      UserState,
    ], {
        developmentMode: !environment.production,
        selectorOptions: {
          suppressErrors: true,
          // `false` will be the default for `injectContainerState` in v4.
          // `true` is the current default, but deprecated.
          // See https://www.ngxs.io/advanced/optimizing-selectors
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

  // Generically, any functionality you 'provide' to your app via DI can be
  // thought of as a service. You know you're using a service when you don't
  // have to think about creating it manually (e.g. `new MyService()`).
  // Creating things within a class/method is bad practice and makes testing
  // more difficult.
  //
  // Anything that can be 'provided' via the dependency injector, making it
  // 'injectable' in the constructors of any class that needs it.
  // `@Injectable({providedIn: 'root'})` is preferred to registering services
  // globally. Or you can specify a service in a module or component
  // provider array if only used there.
  //
  // DI refers to Dependency Injection. The DI 'container' is two things:
  // 1) The registered list of providers that the 'injector' knows how to
  // instantiate and provide to the app, and 2) the actual pool of services
  // already instantiated. When the injector tries to provide a service that
  // hasn't been created/instantiated, it creates it once (singleton) so
  // subsequent uses are faster.
  //
  // Some provided services are concrete and used directly. Others refer to a
  // contract (interface or other abstraction) that needs to know how/what to
  // instantiate for a particular context (e.g. a file service to local disk
  // or cloud storage).
  //
  // See more about DI, Services, and providers:
  // https://angular.io/guide/architecture-services
  //
  // See `The forRoot() pattern`:
  // https://angular.io/guide/singleton-services#the-forroot-pattern

  providers: [
    // Only list externally provided services that don't implement @Injectable.
    // Consider using these in feature modules for better isolation and
    // lazy loading.
    NgxImageCompressService,

    // HTTP_INTERCEPTORS are a unique case since there can be multiple values/
    // interceptors with the same provider token (HTTP_INTERCEPTORS). In this
    // case, the provider token is not a class, but an lookup key called an
    // injector token.
    //
    // See top two answers (seangwright and Leon) here for good descriptions.
    //   https://stackoverflow.com/questions/50211120/angular-6-provide-http-interceptors-for-root
    // And official docs explanation here:
    //   https://angular.io/guide/dependency-injection-in-action#external-module-configuration
    // And blog post showing this setup here:
    //   https://medium.com/codingthesmartway-com-blog/angular-4-3-httpclient-accessing-rest-web-services-with-angular-2305b8fd654b
    {
      provide: HTTP_INTERCEPTORS,
      useClass: WithCredentialsInterceptor,
      multi: true
    }

  ],

  // This is the root component angular creates and inserts into index.html.
  // bootstrap should only be defined in this root module.
  bootstrap: [AppComponent]
})
export class AppModule { }
