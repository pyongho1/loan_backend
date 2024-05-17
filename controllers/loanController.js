const LoanModel = require("../models/loanModel");

const getLoans = (req, res) => {
  LoanModel.getAllLoans((err, loans) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(loans);
  });
};

const getLoansByUser = (req, res) => {
  const { userId } = req.params;
  LoanModel.getLoansByUserId(userId, (err, loans) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      console.log(`Loans fetched for user ${userId}:`, loans); // Log fetched loans
      res.json(loans);
    }
  });
};

const createLoan = (req, res) => {
  const newLoan = {
    userId: req.body.userId,
    fullName: req.body.fullName,
    loanAmount: req.body.loanAmount,
    status: "waiting decision",
  };

  LoanModel.addLoan(newLoan, (err, loan) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      console.log("Loan added:", loan); // Log added loan
      res.status(201).json(loan);
    }
  });
};

const changeLoanStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  LoanModel.updateLoanStatus(id, status, (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(200).json({ id, status });
  });
};

const changeLoanAmount = (req, res) => {
  const { id } = req.params;
  const { loanAmount } = req.body;

  LoanModel.updateLoanAmount(id, loanAmount, (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(200).json({ id, loanAmount });
  });
};

module.exports = {
  getLoans,
  getLoansByUser,
  createLoan,
  changeLoanStatus,
  changeLoanAmount,
};
