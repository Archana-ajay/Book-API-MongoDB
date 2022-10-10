const Book=require("../model/Book")
const { StatusCodes } = require('http-status-codes')
const { NotFoundError } = require('../errors')
const getAllBooks=async(req,res)=>{
    const book=await Book.find({})
    res.status(StatusCodes.OK).json({ book, count: book.length })
}
const createBook=async(req,res)=>{
    const book=await Book.create(req.body)
    res.status(StatusCodes.CREATED).json({ book })   
}
const getBook=async(req,res)=>{
    const {id:bookID}=req.params
        const book=await Book.findOne({_id:bookID})
        if(!book){
            throw new NotFoundError(`No book with id ${bookID}`)
        }
        res.status(StatusCodes.OK).json({ book })
}
const updateBook=async(req,res)=>{
    const {id:bookID}=req.params
        const book=await Book.findOneAndUpdate({_id:bookID},req.body,{new:true,runValidators:true})
        if(!book){
            throw new NotFoundError(`No book with id ${bookID}`)
        }
        res.status(StatusCodes.OK).json({ book })
}
const deleteBook=async(req,res)=>{
    const {id:bookID}=req.params
        const book=await Book.findOneAndDelete({_id:bookID})
        if(!book){
            throw new NotFoundError(`No book with id ${bookID}`)
        }
        res.status(StatusCodes.OK).json({ book })
}

module.exports={getAllBooks,createBook,getBook,updateBook,deleteBook}