import { BookingsService } from './../bookings.service';
import { Component, Input, OnInit } from '@angular/core';
import { Booking } from '../booking.model';
import { DataStorageService } from 'src/app/event/data-storage.service';

@Component({
  selector: 'app-bookings-item',
  templateUrl: './bookings-item.component.html',
  styleUrls: ['./bookings-item.component.css']
})
export class BookingsItemComponent implements OnInit {

  @Input() booking: Booking;
  @Input() index: number;

  constructor(private BookingsService: BookingsService, private dataService: DataStorageService) { }

  ngOnInit(): void {
    console.log(this.booking);
  }

  cancelBooking(){
    this.dataService.deleteBooking(this.index).subscribe(response => {console.log(response)});
    this.BookingsService.removeBooking(this.index);
  }

}
