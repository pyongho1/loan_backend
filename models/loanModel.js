const db = require("../database");

const getAllLoans = (callback) => {
  db.all("SELECT * FROM loans", [], (err, rows) => {
    callback(err, rows);
  });
};

const addLoan = (loan, callback) => {
  const { fullName, loanAmount, status } = loan;
  db.run(
    "INSERT INTO loans (fullName, loanAmount, status) VALUES (?, ?, ?)",
    [fullName, loanAmount, status],
    function (err) {
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
  addLoan,
  updateLoanStatus,
};
