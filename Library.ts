import { LibraryItem, Book, DVD, Magazine } from "./LibraryItem";
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

  findItemByName(itemName: string): LibraryItem | undefined {
    return this.items.find(i => i["itemName"] === itemName);
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
 patch-12
  let summary = "=== Library Items ===\n";

  const books = this.items.filter(i => i instanceof Book);
  const dvds = this.items.filter(i => i instanceof DVD);
  const magazines = this.items.filter(i => i instanceof Magazine);

  summary += "\n--- Books ---\n";
  if (books.length === 0) summary += "No books.\n";
  else {
    books.forEach(b => {
      summary += `ID: ${b["itemId"]} | Title: ${b.title} | Status: ${b.isAvailable() ? "Available" : "Borrowed"} | ${b.getDetails()}\n`;
    });
  }

  summary += "\n--- DVDs ---\n";
  if (dvds.length === 0) summary += "No DVDs.\n";
  else {
    dvds.forEach(d => {
      summary += `ID: ${d["itemId"]} | Title: ${d.title} | Status: ${d.isAvailable() ? "Available" : "Borrowed"} | ${d.getDetails()}\n`;
    });
  }

  summary += "\n--- Magazines ---\n";
  if (magazines.length === 0) summary += "No magazines.\n";
  else {
    magazines.forEach(m => {
      summary += `ID: ${m["itemId"]} | Title: ${m.title} | Status: ${m.isAvailable() ? "Available" : "Borrowed"} | ${m.getDetails()}\n`;
    });
  }
  return summary;
  }

  getMembersSummary(): string {
    let summary = "=== Library Members ===\n";
    if (this.members.length === 0) return summary + "No members.\n";

    this.members.forEach(m => {
      summary += `ID: ${m.getMemberId()} | Name: ${m.getMemberName()} | Borrowed Items: ${m.getBorrowedItems().length}\n`;
    });
    return summary;
  }
}
