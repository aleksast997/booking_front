import { Component, OnInit } from '@angular/core';
import { DataStorageService } from 'src/app/event/data-storage.service';
import { OrganizerService } from '../../organizer.service';
import { Event } from 'src/app/event/event.model';

@Component({
  selector: 'app-my-events-list',
  templateUrl: './my-events-list.component.html',
  styleUrls: ['./my-events-list.component.css']
})
export class MyEventsListComponent implements OnInit {

  myEvents: Event[];

  constructor( private dataService: DataStorageService, private organizerService: OrganizerService ) { }

  ngOnInit(): void {

    this.dataService.fetchEventOrg().subscribe();
    this.organizerService.eventChanged.subscribe(
      (events: Event[]) => {
        this.myEvents = events;
        //console.log("Provera ID"+ this.myEvents[0].ticketsCategory[0].price);
      }
    )
    this.myEvents = this.organizerService.getEvents();
    }
}
