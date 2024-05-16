const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(":memory:");

db.serialize(() => {
  db.run(
    "CREATE TABLE loans (id INTEGER PRIMARY KEY, fullName TEXT, loanAmount REAL, status TEXT)"
  );
});

module.exports = db;
