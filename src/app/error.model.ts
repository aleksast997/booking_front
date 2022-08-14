export class Error {
  message: string;
  status: number;
  timeStamp: number;

  constructor(message: string, status: number, time: number){
    this.message = message;
    this.status = status;
    this.timeStamp = time;
  }
}
