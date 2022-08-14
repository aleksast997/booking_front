import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Role } from '../auth/roles.model';
import { UserToken } from '../auth/user-token.model';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  error: string = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm){
    if(!form.valid){
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    this.authService.login(email,password)
      .pipe(first())
      .subscribe({
        next: (userToken) => {
          console.log(userToken);
          const user_role = <UserToken>userToken;
          console.log(user_role.user_role);
          console.log(user_role.access_token);
          if(user_role.user_role === Role.Customer){
            this.router.navigate(["/events"]);
          }
          if(user_role.user_role === Role.Organizer){
            this.router.navigate(["/organizer"]);
          }
        },
        error: error => {
          if(error.status == "403"){
            this.error = "Wrong credentials! Try again."
          }

          console.log(this.error);
        }
      })

    /*this.authService.login(email, password).subscribe(
      responseData => {
        console.log(responseData);
        this.router.navigate(['/events']);
      },
      errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
      }
    );
    //console.log(form.value);*/
    form.reset();
  }

}
