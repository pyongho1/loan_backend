const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const fs = require("fs");

// Path to the SQLite database file
const dbPath = path.resolve(__dirname, "data", "loans.db");

// Ensure the data directory exists
const dataDir = path.dirname(dbPath);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Create a new database instance, will create the file if it doesn't exist
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Failed to connect to the database:", err.message);
  } else {
    console.log("Connected to the SQLite database.");
  }
});

// Create the loans table if it doesn't exist
db.serialize(() => {
  db.run(
    `
    CREATE TABLE IF NOT EXISTS loans (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId TEXT,
      fullName TEXT,
      loanAmount REAL,
      status TEXT,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `,
    (err) => {
      if (err) {
        console.error("Failed to create the loans table:", err.message);
      }
    }
  );
});

module.exports = db;
