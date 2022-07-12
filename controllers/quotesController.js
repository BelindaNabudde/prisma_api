const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// GET all quotes
const getAllQuotes = async (req, res) => {
  try {
    const quotes = await prisma.quote.findMany();
    res.status(200).json(quotes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST a quote
const createQuote = async (req, res) => {
  try {
    const { text, authorId } = req.body;
    const quote = await prisma.quote.create({
      data: { text, authorId }
    });
    res.status(200).json({ message: "Quote has been added", quote });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET single quote
const getQuoteById = async (req, res) => {
  try {
    const id = req.params.id;
    const quote = await prisma.quote.findUnique({
      where: {
        id: Number(id)
      },
      include: { author: true }
    });
    if (quote) {
      res.status(200).json(quote);
    } else {
      res.status(404).json(`Quote with id ${id} not found`);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE a quote
const updateQuote = async (req, res) => {
  try {
    const id = req.params.id;
    const quote = await prisma.quote.update({
      where: {
        id: Number(id)
      },
      data: req.body
    });
    if (quote) {
      res.status(200).json({ message: "quote has been updated.", quote });
    } else {
      res.status(404).json(`Quote with id ${id} not found`);
    }
  } catch {
    res.status(500).json({ error: error.message });
  }
};

// DELETE a quote
const deleteQuote = async (req, res) => {
  try {
    const id = req.params.id;
    const quote = await prisma.quote.delete({
      where: {
        id: Number(id)
      }
    });
    if (quote) {
      res.status(200).json({ message: "quote has been deleted.", quote });
    } else {
      res.status(404).json(`Quote with id ${id} not found`);
    }
  } catch {
    res.status(500).json({ error: error.message });
  }
};

// Export  all modules
module.exports = {
  getAllQuotes,
  createQuote,
  getQuoteById,
  updateQuote,
  deleteQuote
};
