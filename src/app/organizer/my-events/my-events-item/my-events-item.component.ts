import { OrganizerService } from './../../organizer.service';
import { TicketsCategory } from './../../../ticketsCategory.model';
import { Component, Input, OnInit } from '@angular/core';
import { Event } from 'src/app/event/event.model';
import { EventType } from 'src/app/event/eventType.model';
import { Place } from 'src/app/place.model';
import { DataStorageService } from 'src/app/event/data-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-events-item',
  templateUrl: './my-events-item.component.html',
  styleUrls: ['./my-events-item.component.css']
})
export class MyEventsItemComponent implements OnInit {

  @Input() event: Event;
  @Input() index: number;

  constructor(private dataService: DataStorageService,private organizerService: OrganizerService, private router: Router) { }

  ngOnInit(): void {
  }

  onDelete(){
    this.dataService.deleteEvent(this.index).subscribe(response => {
      console.log(response);
      this.organizerService.removeEvent(this.index);
    },
    error => {
      console.log(error);
    });
    //this.router.navigateByUrl[('http://localhost:4200/organizer')];

  }

  onEdit(){
    //this.dataService.editEvent(index).subscribe();
    const id = this.event.idEvent;
    //this.router.navigate([+id+'/edit']);
  }

}
