import { Router } from '@angular/router';
import { Booking } from './../bookings/booking.model';
import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../event/data-storage.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {

  constructor(private dataStorageService: DataStorageService, private router: Router) { }

  booking: Booking = JSON.parse(localStorage.getItem('pendingBooking'));

  ngOnInit(): void {
    this.dataStorageService.storeBooking(this.booking.event, this.booking.ticketsCategory, this.booking.amount, 1).subscribe();
    localStorage.removeItem('pendingBooking');
    this.router.navigateByUrl('events');
  }



}
