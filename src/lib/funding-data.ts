export const OVERVIEW_METRICS = {
  totalFunding: 36200,
  totalSpent: 24400,
  remainingBalance: 10801,
  accountsClosed: "6th August 2026",
};

export const CONTRIBUTORS = [
  { name: "Dr. Samuel Meshak", amount: 10000 },
  { name: "Vasanth", amount: 6000 },
  { name: "Sneha Benjamin", amount: 5000 },
  { name: "Moses", amount: 5000 },
  { name: "Jeshurun", amount: 3200 },
  { name: "Shalom", amount: 2000 },
  { name: "Meshak", amount: 1000 },
  { name: "Solomon", amount: 1000 },
  { name: "Amali", amount: 1000 },
  { name: "Jenny", amount: 1000 },
  { name: "John Paul", amount: 1000 },
  { name: "Jemimah", amount: null }, // Amount not specified
];

export const TRANSACTIONS = [
  { date: "Wednesday, May 20, 2026", category: "Advance - Rent", amount: 500, notes: "Day 1" },
  { date: "Friday, May 22, 2026", category: "Advance - Rent", amount: 500, notes: "Day 2 & 3" },
  { date: "Not Specified", category: "MICL", amount: 1150, notes: "" },
  { date: "Wednesday, May 27, 2026", category: "Make up", amount: 870, notes: "Foundation" },
  { date: "Wednesday, May 27, 2026", category: "Petrol", amount: 105, notes: "To Arupadai veedu" },
  { date: "Friday, May 29, 2026", category: "Prop - Office", amount: 500, notes: "Printouts" },
  { date: "Saturday, May 30, 2026", category: "RENT", amount: 1850, notes: "Day 1 - May 30" },
  { date: "Saturday, May 30, 2026", category: "Food", amount: 250, notes: "Morning snacks" },
  { date: "Tuesday, June 2, 2026", category: "RENT", amount: 2100, notes: "Day 2 - June 2" },
  {
    date: "Wednesday, June 3, 2026",
    category: "MCIL",
    amount: 1400,
    notes: "Miscellaneous of Day 2",
  },
  { date: "Friday, June 5, 2026", category: "RENT", amount: 2600, notes: "Day 3 - June 5" },
  { date: "Friday, June 5, 2026", category: "Advance - Rent", amount: 1000, notes: "Day 4 & 5" },
  { date: "Friday, June 5, 2026", category: "MCIL", amount: 1200, notes: "Miscellaneous of Day 3" },
  { date: "Monday, June 8, 2026", category: "RENT", amount: 2100, notes: "Day 4 - June 8" },
  { date: "Wednesday, June 10, 2026", category: "RENT", amount: 2100, notes: "Day 5 - June 10" },
  { date: "Monday, July 20, 2026", category: "MCIL", amount: 400, notes: "Miscellaneous of Day 6" },
  { date: "Monday, July 20, 2026", category: "RENT", amount: 2100, notes: "Day 6 - July 20" },
  { date: "Monday, July 20, 2026", category: "Advance - Rent", amount: 500, notes: "Day 6" },
  { date: "Friday, July 31, 2026", category: "Advance - Rent", amount: 500, notes: "Day 7" },
  { date: "Friday, July 31, 2026", category: "RENT", amount: 2100, notes: "Day 7 - July 31" },
  { date: "Friday, July 31, 2026", category: "Food", amount: 360, notes: "Final lunch" },
  { date: "Friday, July 31, 2026", category: "Petrol", amount: 215, notes: "To Maduravayol" },
];

export const CATEGORIES = Array.from(new Set(TRANSACTIONS.map((t) => t.category)));
