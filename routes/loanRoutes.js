const express = require("express");
const router = express.Router();
const loanController = require("../controllers/loanController");

router.get("/loans", loanController.getLoans);
router.post("/loans", loanController.createLoan);
router.put("/loans/:id/status", loanController.changeLoanStatus);

module.exports = router;
