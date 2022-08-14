import { EventService } from './event.service';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Event } from './event.model';
import { Observable } from "rxjs";
import { DataStorageService } from "./data-storage.service";


@Injectable({providedIn: 'root'})
export class EventResolverService implements Resolve<Event[]>{

  constructor(private dataService: DataStorageService, private eventService: EventService){
  }

  resolve (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const events = this.eventService.getEvents();
    if(events.length === 0){
      return this.dataService.fetchEvent();
    }else {
      return events;
    }
  }

}
