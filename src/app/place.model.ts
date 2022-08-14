export class Place {
   public id?: number; //idPlace
   public name: string;
   public maxCapacity: number;

   constructor(name: string, maxCapasity: number){
     //this.id= id;
     this.name = name;
     this.maxCapacity = maxCapasity;
   }
}
