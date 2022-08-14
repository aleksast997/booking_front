import { NgForm } from '@angular/forms';
import { OrganizerService } from './../../organizer.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/event/event.model';
import { DataStorageService } from 'src/app/event/data-storage.service';
import { EventType } from 'src/app/event/eventType.model';

@Component({
  selector: 'app-my-events-detail',
  templateUrl: './my-events-detail.component.html',
  styleUrls: ['./my-events-detail.component.css']
})
export class MyEventsDetailComponent implements OnInit {

  myEvent: Event;
  id: number;
  error: null;
  errorOcured: boolean = false;
  eventTypes: EventType[] = [];
  constructor(private route: ActivatedRoute, private organizerService: OrganizerService, private dataService: DataStorageService) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          console.log(this.route.params);
          this.id = +params['id'];
          this.myEvent = this.organizerService.getEvent(this.id);
          //this.lastPicked = this.event.ticketsCategory[0];
          //this.total = 0;
        }
      );
      this.dataService.fetchEventType().subscribe();
    this.organizerService.typesChanged.subscribe(
      (types: EventType[]) => {
        this.eventTypes = types;
      }
    );
    this.eventTypes = this.organizerService.getEventTypes();
  }


  onSubmit(form: NgForm){


    let eventName = form.value.event_name==='' ? this.myEvent.name : form.value.event_name;
    let eventDescription = form.value.event_description==='' ? this.myEvent.description : form.value.event_description;
    let eventDate = form.value.event_date==='' ? this.myEvent.date : form.value.event_date;
    let eventType = form.value.event_type==='' ? this.myEvent.eventType : form.value.event_type;
    console.log(eventName, eventDescription, eventDate, eventType);

    this.myEvent.name = eventName;
    this.myEvent.description = eventDescription;
    this.myEvent.date = eventDate;
    this.myEvent.eventType = eventType;

    this.dataService.editEvent(this.myEvent);
  }

}
