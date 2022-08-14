import { HttpClient } from '@angular/common/http';
import { BookingsService } from './../bookings/bookings.service';
import { EventEmitter, Injectable } from "@angular/core";
import { TicketsCategory } from "../ticketsCategory.model";
import { Event } from "./event.model";
import { Id } from '../id.model';
import { map, Subject } from 'rxjs';
import { Booking } from '../bookings/booking.model';
import { User } from '../auth/user.model';
import { DataStorageService } from './data-storage.service';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class EventService {

  eventSelected = new EventEmitter<Event>();

  eventChanged = new Subject<Event[]>();

   events: Event[] = [];

  constructor( private bookingsService: BookingsService, private authService: AuthService){}


  setEvents(events: Event[]){
    this.events = events;
    this.eventChanged.next(this.events.slice());
  }

  getEvents(){
    return this.events.slice();
  }

  getEvent(index: number){
    return this.events[index];
  }

  Sort(tickets: TicketsCategory[]){
    var ticketMax: TicketsCategory = new TicketsCategory(new Id(1,1),'','',1000000,0,0);
    var i:number = 0;
    for (let index = 0; index < tickets.length; index++) {
      const element = tickets[index];
      if(ticketMax.price > element.price){
        ticketMax = element;
        i = index;
      }
    }
    tickets[i] = tickets[0];
    tickets[0] = ticketMax;
  }


  addBookingToBL(event: Event, ticketsCategory: TicketsCategory, amount: number){
    var booking = new Booking(ticketsCategory, event, amount, ticketsCategory.price*amount, 0);
    this.bookingsService.addBooking(booking);
  }



}
