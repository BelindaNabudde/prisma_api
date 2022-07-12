const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// GET all authors
const getAllAuthors = async (req, res) => {
  try {
    const authors = await prisma.author.findMany();
    res.status(200).json(authors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST an Author
const createAuthor = async (req, res) => {
  try {
    const { name, quotes } = req.body;
    const author = await prisma.author.create({
      data: { name, quotes }
    });
    res.status(200).json({ message: "Author has been added", author });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET an Author
const getAuthorById = async (req, res) => {
  try {
    const id = req.params.id;
    const author = await prisma.author.findUnique({
      where: {
        id: Number(id)
      }
    });
    if (author) {
      res.status(200).json(author);
    } else {
      res.status(404).json(`Author with id ${id} not found`);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE  an Author
const updateAuthor = async (req, res) => {
  try {
    const id = req.params.id;
    const author = await prisma.author.update({
      where: {
        id: Number(id)
      },
      data: req.body
    });
    if (author) {
      res.status(200).json({ message: "author has been updated.", author });
    } else {
      res.status(404).json(`Author with id ${id} not found`);
    }
  } catch {
    res.status(500).json({ error: error.message });
  }
};

// DELETE an Author
const deleteAuthor = async (req, res) => {
  try {
    const id = req.params.id;
    const author = await prisma.author.delete({
      where: {
        id: Number(id)
      }
    });
    if (author) {
      res.status(200).json({ message: "Author has been deleted.", author });
    } else {
      res.status(404).json(`Author with id ${id} not found`);
    }
  } catch {
    res.status(500).json({ error: error.message });
  }
};

// Export all modules
module.exports = {
  getAllAuthors,
  createAuthor,
  getAuthorById,
  updateAuthor,
  deleteAuthor
};
