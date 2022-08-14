import { tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { environment } from 'src/environments/environment';
import { TicketsCategory } from '../ticketsCategory.model';
import { Event } from './event.model';
import { DataStorageService } from './data-storage.service';


@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  stripePromise = loadStripe(environment.stripe);
  baseUrl: string = "http://localhost:7070/api/payment";

  constructor(private http: HttpClient, private dataStorageService: DataStorageService) { }

  async pay(event: Event, ticketsCategory: TicketsCategory, quantity: number): Promise<void> {
    const payment = {
      name: event.name,
      currency: 'usd',
      amount: ticketsCategory.price,
      quantity: quantity,
      cancelUrl: 'http://localhost:4200/cancel',
      successUrl: 'http://localhost:4200/success'
    };
    const stripe = await this.stripePromise;

    this.http.post(this.baseUrl,payment)
    .subscribe((data: any) => {
        const client_secret = data.client_secret;
        stripe.redirectToCheckout({
          sessionId: data.id,
        });
    });
  }
}
