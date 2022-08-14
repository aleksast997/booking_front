import { TicketsCategory } from './../../ticketsCategory.model';
import { Component, Input, OnInit } from '@angular/core';
import { Event } from '../event.model';

@Component({
  selector: 'app-event-item',
  templateUrl: './event-item.component.html',
  styleUrls: ['./event-item.component.css']
})
export class EventItemComponent implements OnInit {

  @Input() event: Event;
  @Input() index: number;

  constructor() { }

  ngOnInit(): void {
    var min: Number;
      min = 100000000000;
    var indexMin: number = 0;
    for (let index = 0; index < this.event.ticketsCategory.length; index++) {
      const element = this.event.ticketsCategory[index].price;
      if(element < min){
        min = element;
        indexMin = index;
      }
    }
    const pom =  this.event.ticketsCategory[0];
    this.event.ticketsCategory[0] = this.event.ticketsCategory[indexMin];
    this.event.ticketsCategory[indexMin] = pom;
    console.log(this.event.ticketsCategory[0].price);
  }

}
