export class EventType {
  public idEventType: number; //idEventType
  public name: string;
  public description: string;

  constructor(id: number, name: string, description: string){
    this.idEventType = id;
    this.name = name;
    this.description = description;
  }
}
