const express=require("express")
const app=express()
require("express-async-errors")
require("dotenv").config()
const fileUpload = require('express-fileupload');
const connectDB = require("./db/connect");

const booksRouter = require("./routes/books");

const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());
app.use(fileUpload({
  limits: {
      fileSize: 1024 * 1024 // 1 MB
  },
  abortOnLimit: true,
  createParentPath: true
}));

// routes
app.use('/api/v1/books',booksRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();






