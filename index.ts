import readline from "readline";
import { Library } from "./Library";
import { LibraryMember } from "./LibraryMember";
import { Book, DVD } from "./LibraryItem";

// สร้าง library
const library = new Library();

// สร้าง readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// ฟังก์ชันช่วยถาม user
function askQuestion(query: string): Promise<string> {
  return new Promise(resolve => rl.question(query, answer => resolve(answer)));
}

async function main() {
  console.log("=== Welcome to the Library System ===");

  while (true) {
    console.log("\nOptions:");
    console.log("1. Add Member");
    console.log("2. Add Book");
    console.log("3. Add DVD");
    console.log("4. Borrow Item");
    console.log("5. Return Item");
    console.log("6. Reserve Item");
    console.log("7. Show Library Summary");
    console.log("8. Check Item Status");
    console.log("9. Pay Fine");
    console.log("0. Exit");

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

            case "8": {
                const itemId = await askQuestion("Enter item ID: ");
                console.log(library.checkItemStatus(itemId));
                break;
            }

            case "9": {
                const memberId = await askQuestion("Enter member ID: ");
                const member = library.findMemberById(memberId);
                if (!member) {
                    console.log("Member not found.");
                    break;
                }

                const itemId = await askQuestion("Enter item ID to pay fine for: ");
                const loan = member["borrowedItems"].find(l => l.item["itemId"] === itemId);
                if (!loan || loan.fine <= 0) {
                    console.log("No fine to pay for this item.");
                    break;
                }

                const methodChoice = await askQuestion("Payment method (Cash/CreditCard/QRCode): ");
                const method = methodChoice as PaymentMethod;
                const payment = loan.payFine(method);
                if (payment) console.log(`✅ Fine paid: ${payment.amount} THB via ${payment.method}`);
                else console.log("Error paying fine.");
                break;
            }

            case "0":
                console.log("Exiting...");
                rl.close();
                return;

            default:
                console.log("Invalid option. Try again.");
        }
    }
}

main();
