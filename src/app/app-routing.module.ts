import { CancelComponent } from './cancel/cancel.component';
import { MyEventsDetailComponent } from './organizer/my-events/my-events-detail/my-events-detail.component';
import { LogInComponent } from './log-in/log-in.component';
import { OrganizerComponent } from './organizer/organizer.component';
import { EventDetailComponent } from './event/event-detail/event-detail.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EventComponent } from "./event/event.component";
import { BookingsComponent } from './bookings/bookings.component';
import { MyEventsComponent } from './organizer/my-events/my-events.component';
import { AuthGuard } from './auth/auth.guard';
import { Role } from './auth/roles.model';
import { SuccessComponent } from './success/success.component';


const appRoutes: Routes = [
  { path: '', redirectTo: '/log-in', pathMatch: 'full'},
  { path: 'home', redirectTo:'/events'},

  { path: 'events', component: EventComponent,
  //canActivate: [AuthGuard],
  //data: {roles: [Role.Customer]},
    children: [
    { path: '', redirectTo: '/events', pathMatch: 'full'},
    { path: ':id', component: EventDetailComponent,
    //canActivateChild: [AuthGuard]
  }
  ]},

  { path: 'bookings', component: BookingsComponent,
  //data: {roles: [Role.Customer]},
   //canActivate: [AuthGuard]
  },

  { path: 'organizer', component: OrganizerComponent,
  //data: {roles: [Role.Organizer]},
  canActivate: [AuthGuard]
  },

  { path: 'my-events', component: MyEventsComponent, canActivate: [AuthGuard],
    children: [
      { path: ':id', component: MyEventsDetailComponent}
    ]
  },
  { path: 'log-in', component: LogInComponent},
  {
    path: 'success', component: SuccessComponent
  },
  {
    path: 'cancel', component: CancelComponent
  }
];


@NgModule({
  imports:[RouterModule.forRoot(appRoutes)],
  exports:[RouterModule]
})
export class AppRoutingModule {

}
