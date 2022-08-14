import { Event } from '../event/event.model';
import { User } from '../auth/user.model';
import { TicketsCategory } from './../ticketsCategory.model';


export class Booking {
  public ticketsCategory: TicketsCategory;
  //public user: User;
  public event: Event;
  public amount: number;
  public price: number;
  public paid: number;

  constructor( ticketsCategory:TicketsCategory, Event: Event, amount: number, price: number, paid: number){
    this.ticketsCategory = ticketsCategory;
    //this.user = user;
    this.event = Event;
    this.amount = amount;
    this.price = price;
    this.paid = paid;
  }
}
