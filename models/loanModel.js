const db = require("../database");

const getAllLoans = (callback) => {
  db.all("SELECT * FROM loans", [], (err, rows) => {
    if (err) {
      console.error("Error fetching all loans:", err);
    } else {
      console.log("All loans:", rows); // Log all loans
    }
    callback(err, rows);
  });
};

const getLoansByUserId = (userId, callback) => {
  db.all("SELECT * FROM loans WHERE userId = ?", [userId], (err, rows) => {
    if (err) {
      console.error(`Error fetching loans for user ${userId}:`, err);
    } else {
      console.log(`Loans fetched for user ${userId}:`, rows); // Log loans for user
    }
    callback(err, rows);
  });
};

const addLoan = (loan, callback) => {
  const { userId, fullName, loanAmount, status } = loan;
  db.run(
    "INSERT INTO loans (userId, fullName, loanAmount, status) VALUES (?, ?, ?, ?)",
    [userId, fullName, loanAmount, status],
    function (err) {
      if (err) {
        console.error("Error adding loan:", err);
      } else {
        console.log("Loan added:", { id: this.lastID, ...loan }); // Log added loan
      }
      callback(err, { id: this.lastID, ...loan });
    }
  );
};

const updateLoanStatus = (id, status, callback) => {
  db.run(
    "UPDATE loans SET status = ? WHERE id = ?",
    [status, id],
    function (err) {
      callback(err);
    }
  );
};

module.exports = {
  getAllLoans,
  getLoansByUserId,
  addLoan,
  updateLoanStatus,
};
