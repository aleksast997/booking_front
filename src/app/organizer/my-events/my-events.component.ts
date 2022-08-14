import { Event } from './../../event/event.model';
import { OrganizerService } from './../organizer.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.component.html',
  styleUrls: ['./my-events.component.css']
})
export class MyEventsComponent implements OnInit {

  myEvent: Event;

  constructor( private organizerService: OrganizerService) { }

  ngOnInit(): void {
    this.organizerService.selectedMyEvent
      .subscribe(
        (myEvent: Event) => {
          this.myEvent = myEvent;
        }
      )
  }

}
