import { Role } from "./roles.model";

export class User {

  constructor(



    /*access_token: string;
    refresh_token: string;*/


    public id: number,
    public name: string,
    public role: Role,
    private _token?: string,
    //private _tokenExpirationDate: Date
    ){}

    get token(){
      /*if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate){
        return null;
      }*/
      return this._token;
    }
}
