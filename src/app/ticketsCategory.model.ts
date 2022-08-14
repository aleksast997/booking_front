import { Id } from "./id.model";

export class TicketsCategory {
  public id: Id;
  public name: string;
  public description: string;
  public price: number;
  public maxSeats: number;
  public occupiedSeats: number;
  //dodaj event u model

  constructor(id: Id, name: string, description: string, price: number, maxSeats: number, occupiedSeats: number){
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.maxSeats = maxSeats;
    this.occupiedSeats = occupiedSeats;
  }
}
