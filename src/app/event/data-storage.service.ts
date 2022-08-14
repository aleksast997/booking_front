import { TicketsCategory } from './../ticketsCategory.model';
import { Booking } from './../bookings/booking.model';
import { EventService } from './event.service';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Event } from './event.model';
import { map, retry, tap, catchError, take, exhaustMap } from 'rxjs/operators';
import { EventType } from './eventType.model';
import { OrganizerService } from '../organizer/organizer.service';
import { BookingsService } from '../bookings/bookings.service';
import { User } from '../auth/user.model';
import { Place } from '../place.model';
import { throwError } from 'rxjs';
import { Error } from '../error.model';
import { AuthService } from '../auth/auth.service';

@Injectable({providedIn: 'root'})
export class DataStorageService {

  //error: Error = null;

  constructor(private http: HttpClient,
    private eventService: EventService,
    private organizerService: OrganizerService,
    private bookingServie: BookingsService,
    private authService: AuthService){}


  storeEvents(){
    const events = this.eventService.getEvents();
    this.http.put('',events).subscribe(response => {console.log('as')});
  }

  fetchEvent() {
      return this.http.get<Event[]>('http://localhost:7070/event').pipe(
        map(events =>{
          return events.map(event => {
            return { ...event, ticketsCategory: event.ticketsCategory ? event.ticketsCategory : []};
        });
        }),
        tap(events => {
          this.eventService.setEvents(events);
        })
      );
    }

  fetchEventOrg() {
    return this.http.get<Event[]>('http://localhost:7070/organizator')
    .pipe(map(events =>{
      return events.map(event => {
        return { ...event, ticketsCategory: event.ticketsCategory ? event.ticketsCategory : []}
    });
    }),
      tap(events => {
        this.organizerService.setEvents(events);
      })
    )
  }

  fetchEventType() {
    return this.http.get<EventType[]>('http://localhost:7070/eventType')
    .pipe(map(types =>{
      return types.map(type => {
        return {...type}
    });
    }),
      tap(types => {
        //console.log(types);
        this.organizerService.setEventTypes(types);
      })
    )
  }

  addEvent(event: Event){
    console.log(JSON.stringify(event));
    return this.http.post('http://localhost:7070/event',event);
  }

  fetchPlaces() {
    return this.http.get<Place[]>('http://localhost:7070/place')
    .pipe(map(places =>{
      return places.map(place => {
        return {...place}
    });
    }),
      tap(places => {
        //console.log(types);
        this.organizerService.setPlaces(places);
      })
    )
  }

  handleError(error: HttpErrorResponse){
    console.log(error);
    console.log(error.error.message);
    return throwError(error.error.message);
  }


  storeBooking(event: Event, TicketsCategory: TicketsCategory, amount: number, paid: number){
    const booking = new Booking( TicketsCategory, event, amount, TicketsCategory.price*amount, paid);
    console.log(booking);
    console.log(JSON.stringify(booking));
    //const header ={'content-type':'application/json'};
    /*this.bookingServie.bookingChange.subscribe((bookings: Booking[]) => {
      booking = bookings;
      console.log(bookings);
    });*/
     return this.http.post('http://localhost:7070/booking',booking)/*.subscribe();*/
    .pipe(
      //retry(3),
      catchError(this.handleError)
      )
      /*.subscribe(
        response => {
          console.log(response)
        }, error => {
          console.log(error)
        });*/
  }

  fetchBookings(){
    return this.http.get<Booking[]>('http://localhost:7070/booking')
    .pipe(map(bookings =>{
      //console.log(bookings);
      return bookings.map(booking => {
        return {...booking}
    });
    }),
      tap(bookings => {
        //console.log(bookings);
        this.bookingServie.setBookings(bookings);
      })
    )
  }

  /*fetchBookings(){
    return this.http.get<{[key: string]: Booking}>('http://localhost:7070/booking')
    .pipe(
      map(responseData =>{
        const postsArray: Booking[] = [];
        for( const key in responseData){
          if(responseData.hasOwnProperty(key)){
            postsArray.push({...responseData[key], id: key});
            //console.log(postsArray[key]);
          }
        }
        console.log(postsArray);
        this.bookingServie.setBookings(postsArray);
      //return postsArray;
    }))
  }*/


  deleteBooking(index: number){
    const booking = this.bookingServie.bookings[index];

    console.log('http://localhost:7070/booking/'+booking.event.idEvent);
    return this.http.delete('http://localhost:7070/booking/'+booking.event.idEvent,
    {
      headers: new HttpHeaders()
                .set("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS")
    });
  }

  deleteEvent(index: number){
    const event = this.organizerService.events[index];
    //this.organizerService.removeEvent(index);
    console.log(event.idEvent);
    //console.log('http://localhost:7070/event/'+event.idEvent);
    return this.http.delete('http://localhost:7070/event/'+event.idEvent,
    {
      headers: new HttpHeaders()
                .set("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS")
    }
    );
  }

  editEvent(event: Event){
    console.log(JSON.stringify(event));
    this.http.put('http://localhost:7070/event',event).subscribe(response => { console.log(response) });
  }

  /*editEvent(index: number){
    const event = this.organizerService.events[index];
    this.organizerService.editEvent(event);
  }*/

}
