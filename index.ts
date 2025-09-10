import { Library } from "./Library";
import { LibraryMember} from "./LibraryMember";
import { Book, DVD } from "./LibraryItem";

const library = new Library();

// สร้างสมาชิก
const alice = new LibraryMember("M001", "Alice");
const bob = new LibraryMember("M002", "Bob");

library.addMember(alice);
library.addMember(bob);

// สร้าง item
const book1 = new Book("Clean Code", "B001", "Robert C. Martin", 450);
const dvd1 = new DVD("Inception", "D001", 148, "Christopher Nolan");

library.addItem(book1);
library.addItem(dvd1);

// ยืมหนังสือ
console.log(library.borrowItem("B001", "M001")); // Alice borrowed "Clean Code"

// จองหนังสือ
console.log(library.reserveItem("B001", "M002")); // Bob reserved "Clean Code"

// คืนหนังสือ
console.log(library.returnItem("B001", "M001")); // Returned successfully (หรือมี fine)
