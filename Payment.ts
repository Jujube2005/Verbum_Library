import { LibraryMember } from "./LibraryMember";

export enum PaymentMethod {
  CASH = "Cash",
  CREDIT_CARD = "CreditCard",
  QR_CODE = "QRCode"
}

export class Payment {
  paymentId: string;
  paymentDate: Date;

  constructor(
    paymentId: string,
    public member: LibraryMember,
    public amount: number,
    public method: PaymentMethod
  ) {
    this.paymentId = paymentId;
    this.paymentDate = new Date();
  }

  getDetails(): string {
    return `Payment ${this.paymentId}: ${this.amount} via ${this.method} by ${this.member.getMemberName()} on ${this.paymentDate}`;
  }
}
