const Book=require("../model/Book")
const path = require('path');
const { StatusCodes } = require('http-status-codes')
const { NotFoundError,BadRequestError } = require('../errors')
const APIFeatures=require("../utils/api-features")

//retrieve the books created by user from database
const getAllBooks=async(req,res)=>{
    const features= new APIFeatures(Book.find({createdBy: req.user.userId }),req.query).paginate()  
    const book=await features.query
    res.status(StatusCodes.OK).json({ book, count: book.length })
}

//create book and save in the databse
const createBook=async(req,res)=>{
    if (!req.files) {
        throw new BadRequestError('No File Uploaded');
      }
      const bookImage = req.files.imageUrl;
      const extensionName = path.extname(bookImage.name);
      const allowedExtension = ['.png','.jpg','.jpeg'];
      if(!allowedExtension.includes(extensionName)){
        throw new BadRequestError('Please Upload a valid Image');
    }
    const imagePath = path.join(
        __dirname,
        '../uploads/' + `${bookImage.name}`
      );
      await bookImage.mv(imagePath);
      req.body.imageUrl=`/uploads/${bookImage.name}`
      req.body.createdBy = req.user.userId
      const book=await Book.create(req.body)
      res.status(StatusCodes.CREATED).json({ book })
}

//retrieve a single book from database
const getBook=async(req,res)=>{
    const {
        user: { userId },
        params: { id: bookID },
      } = req
        const book=await Book.findOne({_id:bookID,createdBy:userId})
        if(!book){
            throw new NotFoundError(`No book with id ${bookID}`)
        }
        res.status(StatusCodes.OK).json({ book })
}

//update a book in database
const updateBook=async(req,res)=>{
    const {
        user: { userId },
        params: { id: bookID },
      } = req
        const book=await Book.findOneAndUpdate({_id:bookID,createdBy: userId},req.body,{new:true,runValidators:true})
        if(!book){
            throw new NotFoundError(`No book with id ${bookID}`)
        }
        res.status(StatusCodes.OK).json({ book })
}

//delete a book from database
const deleteBook=async(req,res)=>{
    const {
        user: { userId },
        params: { id: bookID },
      } = req
        const book=await Book.findOneAndDelete({_id:bookID,createdBy: userId})
        if(!book){
            throw new NotFoundError(`No book with id ${bookID}`)
        }
        res.status(StatusCodes.OK).json({ book })
}

module.exports={getAllBooks,createBook,getBook,updateBook,deleteBook}