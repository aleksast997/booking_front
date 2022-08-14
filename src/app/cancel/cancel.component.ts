import { Router } from '@angular/router';
import { Booking } from './../bookings/booking.model';
import { DataStorageService } from './../event/data-storage.service';
import { BookingsService } from './../bookings/bookings.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cancel',
  templateUrl: './cancel.component.html',
  styleUrls: ['./cancel.component.css']
})
export class CancelComponent implements OnInit {

  constructor(private bookingsService: BookingsService, private dataStorageService: DataStorageService, private router: Router) { }

  ngOnInit(): void {

    localStorage.removeItem('pendingBooking');
    this.router.navigateByUrl('events');
  }

}
