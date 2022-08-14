import { TicketsCategory } from './../ticketsCategory.model';
import { Place } from './../place.model';
import { EventType } from "./eventType.model";

export class Event {
  public idEvent: number; //idEvent
  public name: string;
  public description: string;
  public date: Date;
  public place?: Place;
  public eventType?: EventType;
  //public organizer: Organizer;
  public ticketsCategory: TicketsCategory[];
  key?: string;
  length?: number;

  constructor(name: string, desription: string, date: Date, place: Place, eventType: EventType, TicketsCategory: TicketsCategory[]){
    //this.idEvent = id;
    this.name = name;
    this.description = desription;
    this.date = date;
    this.place = place;
    this.eventType = eventType;
    //this.organizer = organizer;
    this.ticketsCategory = TicketsCategory;
  }

}
