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

  checkItemStatus(itemId: string): string {
  const item = this.findItemById(itemId);
  if (!item) return "Item not found.";

  // ตรวจสถานะยืม
  const status = item.isAvailable() ? "Available" : "Borrowed";

  // ตรวจว่ามีการจองหรือไม่
  const reservation = this.reservations.find(
    r => r.item["itemId"] === itemId && r.status === "Active"
  );
  const reserved = reservation ? `Reserved by ${reservation.member.getMemberName()}` : "";

  return `Item: ${item.title}\nStatus: ${status}${reserved ? " | " + reserved : ""}`;
}

  getLibrarySummary(): string {
    let summary = "=== Library Items ===\n";
    if (this.items.length === 0) summary += "No items in library.\n";
    else {
      this.items.forEach(i => {
        summary += `ID: ${i["itemId"]}, Title: ${i.title}, Status: ${i.isAvailable() ? "Available" : "Borrowed"}, Details: ${i.getDetails()}\n`;
      });
    }

    summary += "\n=== Library Members ===\n";
    if (this.members.length === 0) summary += "No members.\n";
    else {
      this.members.forEach(m => {
        summary += `ID: ${m.getMemberId()}, Name: ${m.getMemberName()}\n`;
      });
    }

    return summary;
  }
