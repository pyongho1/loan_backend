const express = require("express");
const router = express.Router();
const loanController = require("../controllers/loanController");

router.get("/loans", loanController.getLoans);
router.get("/loans/:userId", loanController.getLoansByUser);
router.post("/loans", loanController.createLoan);
router.put("/loans/:id/status", loanController.changeLoanStatus);
router.put("/loans/:id/amount", loanController.changeLoanAmount);
router.delete("/loans/:id", loanController.deleteLoan);

module.exports = router;
