import { LibraryItem } from "./LibraryItem";
import { Loan } from "./Loan";

export class LibraryMember {
  private borrowedItems: Loan[] = [];

  constructor(private memberId: string, private name: string) {}

  getMemberName(): string {
    return this.name;
  }

  getMemberId(): string {
    return this.memberId;
  }

  borrowItem(item: LibraryItem, loan: Loan): string {
    this.borrowedItems.push(loan);
    return loan.item.borrow(this.name);
  }

  returnItem(itemId: string, returnDate: Date): string {
    const loan = this.borrowedItems.find(l => l.item["itemId"] === itemId);
    if (!loan) return "No such loan found.";

    loan.closeLoan(returnDate);
    loan.item.returnItem();

    if (loan.fine > 0) return `Returned with fine: ${loan.fine}`;
    return "Returned successfully.";
  }
}
