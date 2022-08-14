import { TicketsCategory } from './../ticketsCategory.model';
import { OrganizerService } from './organizer.service';
import { EventService } from './../event/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Place } from '../place.model';
import { EventType } from '../event/eventType.model';
import { Subject } from 'rxjs';
import { DataStorageService } from '../event/data-storage.service';
import { Event } from '../event/event.model';

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.css']
})
export class OrganizerComponent implements OnInit {

  eventForm: FormGroup;
  places: Place[] = [{name: 'Beograd', maxCapacity: 100}];
  eventTypes: EventType[] = [
    {name: ' ', description: ' ', idEventType: 0}
  ];

  ticketsCategory: TicketsCategory[] = [];
  seatsTaken: number = 0;
  error: string = null;
  errorOccured = false;


  constructor(private route: ActivatedRoute, private organizerService: OrganizerService,
    private dataService: DataStorageService, private router: Router) { }

  ngOnInit(): void {
    this.dataService.fetchEventType().subscribe();
    this.organizerService.typesChanged.subscribe(
      (types: EventType[]) => {
        this.eventTypes = types;
      }
    );
    this.eventTypes = this.organizerService.getEventTypes();
    //console.log(this.eventTypes);

    this.dataService.fetchPlaces().subscribe();
    this.organizerService.placesChange.subscribe(
      (places: Place[]) => {
        this.places = places;
      }
    );
    this.places = this.organizerService.getPlaces();
    this.errorOccured = false;

    this.initForm();
  }

  initForm(){
    //this.seatsTaken = 0;
    let eventName = null;
    let eventDate = new Date();
    let eventPlace = null;
    let eventDescription = ' ';
    let eventType = this.eventTypes[0];
    let eventTicketsCategory = new FormArray([]);

    this.eventForm = new FormGroup({
      'name': new FormControl(eventName, Validators.required),
      'date': new FormControl(eventDate, Validators.required),
      'description': new FormControl(eventDescription, Validators.required),
      'eventType': new FormControl(eventType, Validators.required),
      'place': new FormControl(eventPlace, Validators.required),
      'TicketsCategory': eventTicketsCategory
    })
  }

  get controls(){
    return (<FormArray>this.eventForm.get('TicketsCategory')).controls;
  }

  onAddTicketType(){
    (<FormArray>this.eventForm.get('TicketsCategory')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'description': new FormControl(null, Validators.required),
        'price': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
        'maxSeats': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    );
    //console.log(this.eventForm.value['TicektsCategory'])
  }

  validation(event: Event){
    this.seatsTaken = 0;
    for( let i of event.ticketsCategory){
      this.seatsTaken += i.maxSeats;
      console.log(this.seatsTaken);
    }
    if(this.seatsTaken > event.place.maxCapacity){
      return false;
    } else return true;
  }

  onDeleteTicketCategory(i: number){
    (<FormArray>this.eventForm.get('TicketsCategory')).removeAt(i);
  }

  onSubmit(){
      const newEvent = new Event(
        this.eventForm.value['name'],
        this.eventForm.value['description'],
        this.eventForm.value['date'],
        this.eventForm.value['place'],
        this.eventForm.value['eventType'],
        this.eventForm.value['TicketsCategory']
      );
    if(this.validation(newEvent)){
      console.log(newEvent);
      this.dataService.addEvent(newEvent).subscribe(response => {
        console.log(response);
        this.eventForm.reset();
        this.router.navigate(['/my-events']);
      },
      error => { console.log(error);}
      );

    } else {
      console.log('Error!!!!!!');
      this.errorOccured = true;
      this.error = "You have exceeded the limit of place capacity!"

    }

  }

}
