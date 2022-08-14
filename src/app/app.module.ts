import { EventService } from './event/event.service';
import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LogInComponent } from './log-in/log-in.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { EventComponent } from './event/event.component';
import { EventListComponent } from './event/event-list/event-list.component';
import { EventDetailComponent } from './event/event-detail/event-detail.component';
import { EventItemComponent } from './event/event-item/event-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookingsComponent } from './bookings/bookings.component';
import { BookingsListComponent } from './bookings/bookings-list/bookings-list.component';
import { BookingsItemComponent } from './bookings/bookings-item/bookings-item.component';
import { BookingsService } from './bookings/bookings.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { OrganizerComponent } from './organizer/organizer.component';
import { OrganizerHeaderComponent } from './organizer/organizer-header/organizer-header.component';
import { DropdownDirectictive } from './organizer/dropdown.directive';
import { MyEventsComponent } from './organizer/my-events/my-events.component';
import { MyEventsItemComponent } from './organizer/my-events/my-events-item/my-events-item.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { JWTInterceptor } from './auth/jwt-interceptor.service';
import { MyEventsListComponent } from './organizer/my-events/my-events-list/my-events-list.component';
import { MyEventsDetailComponent } from './organizer/my-events/my-events-detail/my-events-detail.component';
import { SuccessComponent } from './success/success.component';
import { CancelComponent } from './cancel/cancel.component';

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    HomeComponent,
    HeaderComponent,
    EventComponent,
    EventListComponent,
    EventDetailComponent,
    EventItemComponent,
    BookingsComponent,
    BookingsListComponent,
    BookingsItemComponent,
    OrganizerComponent,
    OrganizerHeaderComponent,
    DropdownDirectictive,
    MyEventsComponent,
    MyEventsItemComponent,
    MyEventsListComponent,
    MyEventsDetailComponent,
    SuccessComponent,
    CancelComponent
  ],
  imports: [
    BrowserModule, FormsModule, AppRoutingModule, HttpClientModule, ReactiveFormsModule
  ],
  providers: [
    BookingsService,
    EventService,
    /*{
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },*/
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JWTInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
