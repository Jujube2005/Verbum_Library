import { LibraryItem } from "./LibraryItem";
import { LibraryMember } from "./LibraryMember";
import { Loan } from "./Loan";
import { Reservation } from "./Reservation";

export class Library {
  private items: LibraryItem[] = [];
  private members: LibraryMember[] = [];
  private loans: Loan[] = [];
  private reservations: Reservation[] = [];

  addItem(item: LibraryItem): void {
    this.items.push(item);
  }

  addMember(member: LibraryMember): void {
    this.members.push(member);
  }

  findItemById(itemId: string): LibraryItem | undefined {
    return this.items.find(i => i["itemId"] === itemId);
  }

  findMemberById(memberId: string): LibraryMember | undefined {
    return this.members.find(m => m.getMemberId() === memberId);
  }

  borrowItem(itemId: string, memberId: string): string {
    const item = this.findItemById(itemId);
    const member = this.findMemberById(memberId);
    if (!item || !member) return "Item or member not found.";
    if (!item.isAvailable()) return "Item is not available.";

    const loan = new Loan(
      "L-" + Date.now(),
      item,
      member,
      new Date(),
      new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) 
      // due in 7 days
    );
    this.loans.push(loan);
    return member.borrowItem(item, loan);
  }

  returnItem(itemId: string, memberId: string): string {
    const member = this.findMemberById(memberId);
    if (!member) return "Member not found.";
    return member.returnItem(itemId, new Date());
  }

  reserveItem(itemId: string, memberId: string): string {
    const item = this.findItemById(itemId);
    const member = this.findMemberById(memberId);
    if (!item || !member) return "Item or member not found.";

    const reservation = new Reservation(
      "R-" + Date.now(),
      member,
      item,
      new Date(),
      new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) // expiry 3 days
    );
    this.reservations.push(reservation);
    return `${member.getMemberName()} reserved "${item.title}"`;
  }

  getLibrarySummary(): string {
    const itemsSummary = this.items.map(i => i.getDetails()).join("\n");
    const membersSummary = this.members.map(m => m.getMemberName()).join(", ");
    return `Library Items:\n${itemsSummary}\n\nMembers:\n${membersSummary}`;
  }
}
