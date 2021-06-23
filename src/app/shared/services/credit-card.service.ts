import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreditCardPaymentDetails } from '../models/credit-card-payment-details';

@Injectable({
  providedIn: 'root',
})
export class CreditCardService {
  constructor(private httpClient: HttpClient) {}

  saveCreditCardDetails(ccDetails: CreditCardPaymentDetails) {
    return this.httpClient.post<CreditCardPaymentDetails>(
      'http://localhost:3004/credit-card-details',
      ccDetails
    );
  }

  getCreditCardDetails() {
    return this.httpClient.get<CreditCardPaymentDetails[]>(
      'http://localhost:3004/credit-card-details'
    );
  }
}
