export interface Borrowable {
  borrow(memberName: string): string;
  returnItem(): string;
  isAvailable(): boolean;
}

import { Borrowable } from "../interfaces/Borrowable";

export abstract class LibraryItem implements Borrowable {
  private _title: string;
  protected itemId: string;
  private _available: boolean = true;

  constructor(title: string, itemId: string) {
    this._title = title;
    this.itemId = itemId;
  }

  get title(): string {
    return this._title;
  }

  set available(available: boolean) {
    this._available = available;
  }

  isAvailable(): boolean {
    return this._available;
  }

  borrow(memberName: string): string {
    if (!this._available) return `${this._title} is not available.`;
    this._available = false;
    return `${memberName} borrowed ${this._title}`;
  }

  returnItem(): string {
    this._available = true;
    return `${this._title} returned.`;
  }

  abstract getDetails(): string;
}
