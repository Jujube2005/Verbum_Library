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
import { LibraryItem } from "./LibraryItem";

export class Book extends LibraryItem {
  constructor(
    title: string,
    itemId: string,
    private author: string,
    private pages: number
  ) {
    super(title, itemId);
  }

  getDetails(): string {
    return `Book: ${this.title}, Author: ${this.author}, Pages: ${this.pages}`;
  }
}

export class Magazine extends LibraryItem {
  constructor(
    title: string,
    itemId: string,
    private issue: number,
    private month: string
  ) {
    super(title, itemId);
  }

  getDetails(): string {
    return `Magazine: ${this.title}, Issue: ${this.issue}, Month: ${this.month}`;
  }
}

export class DVD extends LibraryItem {
  constructor(
    title: string,
    itemId: string,
    private duration: number,
    private director: string
  ) {
    super(title, itemId);
  }

  getDetails(): string {
    return `DVD: ${this.title}, Duration: ${this.duration} mins, Director: ${this.director}`;
  }
}
