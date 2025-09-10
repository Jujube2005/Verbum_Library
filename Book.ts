export class Book extends LibraryItem {
  constructor(
    title: string,
    itemId: string,
    private author: string,
    private pages: number
  ) {
    super(title, itemId);
  }
