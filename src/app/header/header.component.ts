import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Booking } from '../bookings/booking.model';
import { DataStorageService } from '../event/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  bookings: Booking[];

  constructor(private dataService: DataStorageService, private AuthService: AuthService) { }

  ngOnInit(): void {
  }

  fetchBookings(){
    //this.dataService.fetchBookings().subscribe(bookings => {this.bookings = bookings});
    //console.log(this.bookings);
  }

  onLogOut(){
    this.AuthService.logout();
  }

}
