import { BookingsService } from './bookings.service';
import { Component, OnInit } from '@angular/core';
import { Booking } from './booking.model';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {

  selectedBooking: Booking;

  constructor(private bookingsService: BookingsService) { }

  ngOnInit(): void {
    this.bookingsService.selectedBooking
      .subscribe(
        (booking: Booking) => {
          this.selectedBooking = booking;
        }
      );
  }

}
