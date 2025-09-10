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
    console.log("0. Exit");

      default:
        console.log("Invalid option. Try again.");
    }
  }
}

// เรียก main
main();
