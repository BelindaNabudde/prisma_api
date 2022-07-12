const express = require("express");
const router = express.Router();

const quoteSchema = require("../helpers/joi-schema");
const validateData = require("../helpers/validation");

// import controllers
const {
  getAllQuotes,
  createQuote,
  getQuoteById,
  updateQuote,
  deleteQuote
} = require("../controllers/quotesController");

router.get("/", getAllQuotes);

router.post("/", validateData(quoteSchema), createQuote);

router.get("/:id", getQuoteById);

router.patch("/:id", updateQuote);

router.delete("/:id", deleteQuote);

module.exports = router;
