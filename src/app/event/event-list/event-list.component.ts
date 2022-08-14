import { EventService } from './../event.service';
import { Component, OnInit } from '@angular/core';
import { Event } from '../event.model';
import { ActivatedRoute, Router } from '@angular/router';
import { DataStorageService } from '../data-storage.service';


@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  events: Event[];

  constructor(private eventService: EventService, private router: Router, private dataService: DataStorageService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.dataService.fetchEvent().subscribe();
    this.eventService.eventChanged.subscribe(
      (events: Event[]) => {
        this.events = events;
        //console.log("Provera ID"+ this.events[0].ticketsCategory[0].id.idTicketsCategory);
      }
    )
    this.events = this.eventService.getEvents();
  }
}
