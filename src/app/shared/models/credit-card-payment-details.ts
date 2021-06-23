export interface CreditCardPaymentDetails {
  id: number;
  ccNumber: number;
  ccHolder: string;
  ccExpirationDate: string;
  ccSecurityCode: number;
  ccAmount: number;
}
