import { Library } from "./Library";
import { LibraryMember} from "./LibraryMember";
import { Book, DVD } from "./LibraryItem";

const library = new Library();

// --- เพิ่มสมาชิกตัวอย่าง ---
const alice = new LibraryMember("M001", "Alice");
const bob = new LibraryMember("M002", "Bob");
library.addMember(alice);
library.addMember(bob);

// --- เพิ่มสิ่งของตัวอย่าง ---
library.addItem(new Book("Clean Code", "B001", "Robert C. Martin", 450));
library.addItem(new DVD("Inception", "D001", 148, "Christopher Nolan"));
library.addItem(new Magazine("National Geographic", "M001", 12, "August"));

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

const choice = await askQuestion("Choose an option: ");

  switch (choice) {
    case "1":
      const memberName = await askQuestion("Enter member name: ");
      const memberId = "M-" + Date.now();
      library.addMember(new LibraryMember(memberId, memberName));
      console.log(`Member added: ${memberName}, ID: ${memberId}`);
      break;

    case "2":
      const bookTitle = await askQuestion("Enter book title: ");
      const bookAuthor = await askQuestion("Enter author: ");
      const pagesStr = await askQuestion("Enter number of pages: ");
      const pages = parseInt(pagesStr);
      const bookId = "B-" + Date.now();
      library.addItem(new Book(bookTitle, bookId, bookAuthor, pages));
      console.log(`Book added: ${bookTitle}, ID: ${bookId}`);
      break;

    case "3":
      const dvdTitle = await askQuestion("Enter DVD title: ");
      const director = await askQuestion("Enter director: ");
      const durationStr = await askQuestion("Enter duration in minutes: ");
      const duration = parseInt(durationStr);
      const dvdId = "D-" + Date.now();
      library.addItem(new DVD(dvdTitle, dvdId, duration, director));
      console.log(`DVD added: ${dvdTitle}, ID: ${dvdId}`);
      break;

    case "4":
      const borrowMemberId = await askQuestion("Enter member ID: ");
      const borrowItemId = await askQuestion("Enter item ID: ");
      console.log(library.borrowItem(borrowItemId, borrowMemberId));
      break;

    case "5":
      const returnMemberId = await askQuestion("Enter member ID: ");
      const returnItemId = await askQuestion("Enter item ID: ");
      console.log(library.returnItem(returnItemId, returnMemberId));
      break;
      
   case "6":
      const reserveMemberId = await askQuestion("Enter member ID: ");
      const reserveItemId = await askQuestion("Enter item ID: ");
      console.log(library.reserveItem(reserveItemId, reserveMemberId));
      break;

    case "7":
      console.log(library.getLibrarySummary());
      break;

    case "0":
      console.log("Exiting...");
      rl.close();
      return;

// ยืมหนังสือ
console.log(library.borrowItem("B001", "M001")); // Alice borrowed "Clean Code"

// จองหนังสือ
console.log(library.reserveItem("B001", "M002")); // Bob reserved "Clean Code"

// คืนหนังสือ
console.log(library.returnItem("B001", "M001")); // Returned successfully (หรือมี fine)
