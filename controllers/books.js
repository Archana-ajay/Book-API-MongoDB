const Book=require("../model/Book")
const path = require('path');
const { StatusCodes } = require('http-status-codes')
const { NotFoundError,BadRequestError } = require('../errors')
const APIFeatures=require("../utils/api-features")
const getAllBooks=async(req,res)=>{
    const features= new APIFeatures(Book.find(),req.query).paginate()
    const book=await features.query
    res.status(StatusCodes.OK).json({ book, count: book.length })
}
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