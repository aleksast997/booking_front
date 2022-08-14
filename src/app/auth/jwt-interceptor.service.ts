import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class JWTInterceptor implements HttpInterceptor {


  constructor(private authService: AuthService){}


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const user = this.authService.userValue;
    //console.log(user.access_token);
    const isLoggedIn = user && user.access_token;

    const isApiUrl = req.url.startsWith('http://localhost:7070/');
    if(isLoggedIn && isApiUrl) {
      console.log("logovan jos uvek");
      req = req.clone({
        setHeaders: {
          Authorization: 'Bearer '+user.access_token
        }
      });
    }else{
      console.log("nije logovan");
      req = req.clone({
        setHeaders: {
          error: "You can not access that route!"
        }
      })
    }
    return next.handle(req);
  }
}
