import { Role } from "./roles.model";

export class UserToken {
  constructor(
    public access_token: string,
    public refresh_token: string,
    public user_role: string
  ){}

  get _role() {
    console.log(this.user_role);
    if(this.user_role === "[organizer]"){
      return Role.Organizer.toString();
    }else {
      return Role.Customer.toString();
    }

  }
}
