const express = require("express")
const router = express.Router()
const validator=require('../middleware/validator')

const {
    getAllBooks,
    getRecommendedBooks,
    createBook,
    getBook,
    updateBook,
    deleteBook
} = require("../controllers/books")

router.route('/').post(validator('book'),createBook).get(getAllBooks)
router.route('/recommended_books').get(getRecommendedBooks)
router.route('/:id').get(getBook).delete(deleteBook).patch(updateBook)

module.exports = router