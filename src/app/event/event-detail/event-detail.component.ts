import { Booking } from './../../bookings/booking.model';
import { TicketsCategory } from './../../ticketsCategory.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Event } from '../event.model';
import { EventService } from '../event.service';
import { DataStorageService } from '../data-storage.service';
import { PaymentService } from '../payment.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {
  event: Event;
  id: number;
  total: number;
  lastPicked: TicketsCategory;
  errorOcured = false;
  error = null;



  constructor(private eventService: EventService,
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataStorageService,
    private paymentService: PaymentService) { }


  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          console.log(this.route.params);
          this.id = +params['id'];
          this.event = this.eventService.getEvent(this.id);
          this.lastPicked = this.event.ticketsCategory[0];
          this.total = 0;
        }
      );
  }


  Pick(p: TicketsCategory){
    this.lastPicked = p;
    console.log(this.lastPicked.id.idTicketsCategory);
  }


  Calculate(amount: string){
    if(amount != undefined){
      const a: number = parseInt(amount);
      this.total = this.lastPicked.price*a;
    }else this.total = 0;
  }

  onConfirm(amount: string){
    /*if(parseInt(amount) > (this.lastPicked.maxSeats-this.lastPicked.occupiedSeats)){
      console.log('nema dovoljno mesta');
      this.errorOcured = true;
      this.error = "You picked more tickets than allowed seats!"
    } else {*/
    this.errorOcured = false;
    const a: number = parseInt(amount);
    //this.eventService.addBookingToBL(this.event, this.lastPicked, a);
    const pendingBooking = new Booking(this.lastPicked, this.event, a, this.lastPicked.price*a, 0);
    localStorage.setItem('pendingBooking', JSON.stringify(pendingBooking));
    this.paymentService.pay(this.event, this.lastPicked, a);
    /*this.dataService.storeBooking(this.event, this.lastPicked, a)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/bookings']);
        },
            error =>{
              this.error = error;
              this.errorOcured = true;
            }
      );*/
    //}
  }

  onBook(amount: string){
    if(parseInt(amount) > (this.lastPicked.maxSeats-this.lastPicked.occupiedSeats)){
      console.log('nema dovoljno mesta');
      this.errorOcured = true;
      this.error = "You picked more tickets than allowed seats!"
    } else {
      this.errorOcured = false;
      const a: number = parseInt(amount);
      this.eventService.addBookingToBL(this.event, this.lastPicked, a);
      this.dataService.storeBooking(this.event, this.lastPicked, a, 0)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/bookings']);
        },
            error =>{
              this.error = error;
              this.errorOcured = true;
            }
      );
          }
  }
}
