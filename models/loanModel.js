const db = require("../database");

const getAllLoans = (callback) => {
  db.all("SELECT * FROM loans ORDER BY createdAt DESC", [], (err, rows) => {
    if (err) {
      console.error("Error fetching all loans:", err);
    } else {
      console.log("All loans:", rows);
    }
    callback(err, rows);
  });
};

const getLoansByUserId = (userId, callback) => {
  db.all(
    "SELECT * FROM loans WHERE userId = ? ORDER BY createdAt DESC",
    [userId],
    (err, rows) => {
      if (err) {
        console.error(`Error fetching loans for user ${userId}:`, err);
      } else {
        console.log(`Loans fetched for user ${userId}:`, rows);
      }
      callback(err, rows);
    }
  );
};

const addLoan = (loan, callback) => {
  const { userId, fullName, loanAmount, status } = loan;
  db.run(
    "INSERT INTO loans (userId, fullName, loanAmount, status) VALUES (?, ?, ?, ?)",
    [userId, fullName, loanAmount, status],
    function (err) {
      if (err) {
        console.error("Error adding loan:", err);
        callback(err);
      } else {
        db.get(
          "SELECT * FROM loans WHERE id = ?",
          [this.lastID],
          (err, row) => {
            if (err) {
              console.error("Error fetching new loan:", err);
              callback(err);
            } else {
              console.log("Loan added:", row);
              callback(null, row);
            }
          }
        );
      }
    }
  );
};

const updateLoanAmount = (id, loanAmount, callback) => {
  db.run(
    "UPDATE loans SET loanAmount = ? WHERE id = ?",
    [loanAmount, id],
    function (err) {
      if (err) {
        callback(err);
      } else {
        callback(null, { id, loanAmount });
      }
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
  updateLoanAmount,
  updateLoanStatus,
};
