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

const createLoan = (req, res) => {
  const newLoan = {
    fullName: req.body.fullName,
    loanAmount: req.body.loanAmount,
    status: "waiting decision",
  };

  LoanModel.addLoan(newLoan, (err, loan) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(201).json(loan);
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

module.exports = {
  getLoans,
  createLoan,
  changeLoanStatus,
};
