import { EventEmitter, Injectable } from "@angular/core";
import { Booking } from "./booking.model";
import { Subject } from 'rxjs';


@Injectable()
export class BookingsService {

  bookingChange = new Subject<Booking[]>();
  selectedBooking = new EventEmitter<Booking>();

  bookings: Booking[] = [];

  constructor(){}

  getBookings(){
    return this.bookings.slice();
  }

  setBookings(bookings: Booking[]){
    this.bookings = bookings;
    this.bookingChange.next(this.bookings.slice());
  }

  addBooking(booking: Booking){
    this.bookings.push(booking);
    this.bookingChange.next(this.bookings.slice());
  }

  addBookings(bookings: Booking[]){
    this.bookings.push(...bookings);
    this.bookingChange.next(this.bookings.slice());
  }

  removeBooking(index: number){
    this.bookings[index] = this.bookings[this.bookings.length-1]
    this.bookings.splice(this.bookings.length-1, 1);
    this.bookingChange.next(this.bookings.slice());
  }



}
