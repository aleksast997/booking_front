import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { map, Subject, tap } from "rxjs";
import { EventType } from "../event/eventType.model";
import { Place } from "../place.model";
import { Event } from "../event/event.model";


@Injectable({providedIn: 'root'})
export class OrganizerService {

selectedMyEvent = new EventEmitter<Event>();
eventChanged = new Subject<Event[]>();
events: Event[] = [];



places: Place[] = [];
typesChanged = new Subject<EventType[]>();
placesChange = new Subject<Place[]>();
eventTypes: EventType[] = [];

constructor(private http: HttpClient){}

setPlaces(places: Place[]){
  this.places = places;
  this.placesChange.next(this.places.slice());
}

setEventTypes(types: EventType[]){
  this.eventTypes = types;
  this.typesChanged.next(this.eventTypes.slice());
}

getEventTypes(){
  //console.log(this.eventTypes);
  return this.eventTypes.slice();
}

getPlaces(){
  return this.places.slice();
}





getEvents(){
  return this.events.slice();
}

getEvent(id: number){
  return this.events[id];
}

setEvents(events: Event[]){
  this.events = events;
  this.eventChanged.next(this.events.slice());
}

removeEvent(index: number){
  this.events[index] = this.events[this.events.length-1];
  this.events.splice(this.events.length-1, 1);
  this.eventChanged.next(this.events.slice());
}

}
