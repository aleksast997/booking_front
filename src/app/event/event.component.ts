import { EventService } from './event.service';
import { Component, OnInit } from '@angular/core';
import { Event } from './event.model';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  selectedEvent: Event;

  constructor(private evevntService: EventService) { }

  ngOnInit(): void {
    this.evevntService.eventSelected
      .subscribe(
        (event: Event) => {
          this.selectedEvent = event;
        }
      );
  }



}
