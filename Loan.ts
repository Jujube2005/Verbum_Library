import { LibraryItem } from "./LibraryItem";
import { LibraryMember } from "./LibraryMember";
import { Payment, PaymentMethod } from "./Payment";

export class Loan {
  returnDate?: Date;
  fine: number = 0;
  payment?: Payment;

  constructor(
    public loanId: string,
    public item: LibraryItem,
    public member: LibraryMember,
    public loanDate: Date,
    public dueDate: Date
  ) {}

  calculateFine(): number {
    if (!this.returnDate) return 0;
    const daysLate = Math.max(
      0,
      Math.floor((this.returnDate.getTime() - this.dueDate.getTime()) / (1000 * 60 * 60 * 24))
    );
    this.fine = daysLate * 10; // 10 per day
    return this.fine;
  }

  closeLoan(returnDate: Date): void {
    this.returnDate = returnDate;
    this.calculateFine();

    if (fineAmount > 0) {
    return `📌 Returned late! Fine: ${fineAmount} THB`; // <-- เพิ่มตรงนี้
  } else {
    return "📌 Returned successfully, no fine."; // <-- เพิ่มตรงนี้
  }
    
  }

  payFine(method: PaymentMethod): Payment | undefined {
    if (this.fine > 0) {
      const payment = new Payment(
        "P-" + Date.now(),
        this.member,
        this.fine,
        method
      );
      this.payment = payment;
      this.fine = 0;
      return payment;
    }
    return undefined;
  }
}
