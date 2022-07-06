const express = require('express');
const app = express();

const bookRoute = express.Router();
let Book = require('../model/Book');

// add book 
bookRoute.route('/add-book').post((req,res,next) => {
    Book.create(req.body,(error,data)=>{
        if(error){
            return next(error);
        }else{
            res.json(data)
        }
    })
})

// get all book 
bookRoute.route('/').get((req,res)=>{
    Book.find((error,data)=>{
        if(error){
            return next(error);
        }else{
            res.json(data)
        }
    })
})

// get book 
bookRoute.route('/read-book/:id').get((req,res)=>{
    Book.findById(req.params.id,(error,data)=>{
        if(error){
            return next(error);
        }else{
            res.json(data)
        }
    })
})


// Update Book
bookRoute.route('/update-book/:id').put((req, res, next) => {
    Book.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Book updated successfully!')
    }
  })
})

// delete book 
bookRoute.route('/delete-book/:id').delete((req,res,next)=>{
    Book.findByIdAndRemove(req.params.id,(error,data)=>{
        if(error){
            return next(error);
        }else{
            res.status(200).json({msg:data});
        }
    })
})

// Post method version
bookRoute.route('/apiGetAllBooks').post((req,res)=>{
    Book.find((error,data)=>{
        if(error){
            return next(error);
        }else{
            res.json(data)
        }
    })
})

bookRoute.route('/apiGetBook').post((req,res)=>{
    Book.findById(req.body.id,(error,data)=>{
        if(error){
            return next(error);
        }else{
            res.json(data)
        }
    })
})

bookRoute.route('/apiInsertBook').post((req,res,next) => {
    Book.create(req.body,(error,data)=>{
        if(error){
            return next(error);
        }else{
            // res.json(data)
            res.send('insert book successfully!')
        }
    })
})

bookRoute.route('/apiUpdateBook').post((req, res, next) => {
    Book.findByIdAndUpdate(req.body.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
    //   res.json(data)
      res.send('Book updated successfully!')
    //   console.log('Book updated successfully!')
    }
  })
})

bookRoute.route('/apiDeleteBook').post((req,res,next)=>{
    Book.findByIdAndRemove(req.body.id,(error,data)=>{
        if(error){
            return next(error);
        }else{
            res.send('delete book successfully!')
            // res.status(200).json({msg:data});
        }
    })
})

module.exports = bookRoute;