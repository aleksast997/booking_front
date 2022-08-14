import { BookingsService } from './../bookings.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Booking } from '../booking.model';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/event/data-storage.service';

@Component({
  selector: 'app-bookings-list',
  templateUrl: './bookings-list.component.html',
  styleUrls: ['./bookings-list.component.css']
})
export class BookingsListComponent implements OnInit, OnDestroy {

  bookings: Booking[];
  private subChange: Subscription;

  constructor(private BookingsService: BookingsService, private dataService: DataStorageService) { }
  ngOnDestroy(): void {
    //this.subChange.unsubscribe();
  }

  ngOnInit(): void {
    this.dataService.fetchBookings().subscribe();
    this.BookingsService.bookingChange.subscribe(
      (bookings: Booking[]) => {
        //console.log(bookings);
        this.bookings = bookings;
        //console.log(this.bookings);
      }
    )
    this.bookings = this.BookingsService.getBookings();
  }

}
