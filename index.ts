import readline from "readline";
import { Library } from "./Library";
import { LibraryMember } from "./LibraryMember";
import { Book, DVD, Magazine } from "./LibraryItem";



const library = new Library();

// ตัวอย่างสมาชิก
const alice = new LibraryMember(`M ${Date.now}`, "Alice");
const bob = new LibraryMember(`M ${Date.now}`, "Bob");
library.addMember(alice);
library.addMember(bob);

// ตัวอย่าง items
library.addItem(new Book("Clean Code", "B001", "Robert C. Martin", 450));
library.addItem(new DVD("Inception", "D001", 148, "Christopher Nolan"));
library.addItem(new Magazine("National Geographic", "M001", 12, "August"));

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function askQuestion(query: string): Promise<string> {
    return new Promise(resolve => rl.question(query, ans => resolve(ans)));
}

async function main() {
    console.log("=== Welcome to the Library System ===");

    let exit = false;

    while (!exit) {
        console.log("\n=== Main Menu ===");
        console.log("[1] Login");
        console.log("[2] Register");
        console.log("[3] Admin");
        console.log("[4] Exit");

        const choice = await askQuestion("Select an option: ");

        switch (choice) {
            case "1": {
                const memberId = await askQuestion("Enter your member ID: ");
                const member = library.findMemberById(memberId);
                if (!member) {
                    console.log("Member not found. Please register first.");
                    break;
                }
                await memberMenu(member);
                break;
            }

            case "2": {
                const name = await askQuestion("Enter your name: ");
                const id = "M-" + Date.now();
                library.addMember(new LibraryMember(id, name));
                console.log(`✅ Registered! Your member ID: ${id}`);
                break;
            }

            case "3":
                await adminMenu();
                break;

            case "4":
                console.log("Exiting... 👋");
                exit = true;
                rl.close();
                break;

            default:
                console.log("⚠️ Invalid option, please try again.");
        }
    }
}

// --- Member Menu ---
async function memberMenu(member: LibraryMember) {
    let back = false;
    while (!back) {
        console.log(`\n=== Member Menu (${member.getMemberName()}) ===`);
        console.log("[1] Borrow Item");
        console.log("[2] Return Item");
        console.log("[3] Reserve Item");
        console.log("[4] Show Full Library Details");
        console.log("[5] View My Info");
        console.log("[0] Back to Main Menu");

        const choice = await askQuestion("Select an option: ");

        switch (choice) {
            case "1": {
                const itemId = await askQuestion("Enter item ID: ");
                if (member["isBlacklisted"]) {
                    console.log("Cannot borrow: You are blacklisted.");
                    break;
                }
                console.log(library.borrowItem(itemId, member.getMemberId()));
                break;
            }
            case "2": {
                const itemId = await askQuestion("Enter item ID: ");
                console.log(member.returnItem(itemId, new Date()));
                break;
            }
            case "3": {
                const itemId = await askQuestion("Enter item ID: ");
                console.log(library.reserveItem(itemId, member.getMemberId()));
                break;
            }
            case "4": {
                console.log(library.getLibrarySummary());
                break;
            }
            case "5": {
                console.log(`ID: ${member.getMemberId()}`);
                console.log(`Name: ${member.getMemberName()}`);
                console.log(`Blacklisted: ${member["isBlacklisted"] ? "Yes" : "No"}`);
                console.log(`Borrowed Items: ${member.getBorrowedItems().length === 0
                        ? "None"
                        : member.getBorrowedItems().map(l => l.item.title).join(", ")
                    }`);
                break;
            }
            case "0":
                back = true;
                break;
            default:
                console.log("⚠️ Invalid option");
        }
    }
}

// --- Admin Menu ---
async function adminMenu() {
    let back = false;
    while (!back) {
        console.log("\n=== Admin Menu ===");
        console.log("[1] Add Book");
        console.log("[2] Add DVD");
        console.log("[3] Add Magazine");
        console.log("[4] Show Full Library Details");
        console.log("[0] Back to Main Menu");

        const choice = await askQuestion("Select an option: ");

        switch (choice) {
            case "1": {
                const title = await askQuestion("Book title: ");
                const author = await askQuestion("Author: ");
                const pages = parseInt(await askQuestion("Pages: "));
                const id = "B-" + Date.now();
                library.addItem(new Book(title, id, author, pages));
                console.log(`✅ Book added: ${title}, ID: ${id}`);
                break;
            }
            case "2": {
                const title = await askQuestion("DVD title: ");
                const director = await askQuestion("Director: ");
                const duration = parseInt(await askQuestion("Duration (mins): "));
                const id = "D-" + Date.now();
                library.addItem(new DVD(title, id, duration, director));
                console.log(`✅ DVD added: ${title}, ID: ${id}`);
                break;
            }
            case "3": {
                const title = await askQuestion("Magazine title: ");
                const issue = parseInt(await askQuestion("Issue number: "));
                const month = await askQuestion("Month: ");
                const id = "M-" + Date.now();
                library.addItem(new Magazine(title, id, issue, month));
                console.log(`✅ Magazine added: ${title}, ID: ${id}`);
                break;
            }
            case "4":
                console.log(library.getLibrarySummary());
                console.log(library.getMembersSummary());
                break;
            case "0":
                back = true;
                break;
            default:
                console.log("⚠️ Invalid option");
        }
    }
}

main();
