import { LibraryItem } from "./LibraryItem";
import { LibraryMember } from "./LibraryMember";

export class Reservation {
  status: "Active" | "Cancelled" | "Completed" = "Active";

  constructor(
    public reservationId: string,
    public member: LibraryMember,
    public item: LibraryItem,
    public reservationDate: Date,
    public expiryDate?: Date
  ) {}

  cancel(): void {
    this.status = "Cancelled";
  }

  complete(): void {
    this.status = "Completed";
  }
}
