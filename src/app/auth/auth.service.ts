import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, catchError, map, Observable, Subject, tap, throwError } from "rxjs";
import { UserToken } from "./user-token.model";
import { User } from "./user.model";

interface AuthResponseData {

  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {

  private userSubject: BehaviorSubject<UserToken>;
  public user: Observable<UserToken>;

  constructor(private http: HttpClient, private router: Router){
    this.userSubject = new BehaviorSubject<UserToken>(JSON.parse(localStorage.getItem('userToken')));
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): UserToken {
    console.log(this.userSubject.value);
    if(localStorage.getItem('userToken') != null) this.userSubject = new BehaviorSubject<UserToken>(JSON.parse(localStorage.getItem('userToken')));
    return this.userSubject.value;
  }

  login(username: string, password: string){

    const body = new HttpParams()
      .set('username', username)
      .set('password', password);
    return this.http.post<any>('http://localhost:7070/login',body.toString(),
    {
      headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
    }
    )
      .pipe(map(userToken => {
        localStorage.setItem('userToken', JSON.stringify(userToken));
        this.userSubject.next(userToken);
        console.log(this.userSubject);
        return userToken;
      }));
  }

  /*login(username, password): Observable<any> {
    const body = new HttpParams()
      .set('username', username)
      .set('password', password);

    return this.http.post('/login',
      body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      }
    );
  }*/


  logout(){
    localStorage.removeItem('userToken');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }


  /*login(username, password): Observable<any> {
    const body = new HttpParams()
      .set('username', username)
      .set('password', password);

    return this.http.post('/login',
      body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      }
    );
  }*/


  /*login(email: string, password: string){
   /* return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBHyaQYbOh5RK_1r-pTEtH6sFbv1EhF0Vg',{
      email, password
    })
      .pipe(
        catchError(errorRes => {
          let errorMessage = 'An unknown error occurred!';
          if(!errorRes.error || !errorRes.error.error){
            return throwError(errorMessage);
          }else{
            switch(errorRes.error.error.message){
              case 'EMAIL_NOT_FOUND':
              errorMessage = 'This email does not exist!'
            }
          }
          return throwError(errorMessage);
        }), tap(resData => {
          const expDate = new Date(new Date().getTime() + +resData.expiresIn*1000);
          const user = new User(+resData.localId, resData.email, resData.idToken, expDate);
          this.user.next(user);
        })

    );
  }*/
}
