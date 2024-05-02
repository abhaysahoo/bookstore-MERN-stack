import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

// Route to save a new book
router.post("/", async (request, response) => {
    try {
        if(!request.body.title 
            || !request.body.author 
            || !request.body.publishYear)
        {
            return response.status(400).send({
                message: 'Send all required fields: title, author, publishYear',
            });
        }

        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        };

        const book = await Book.create(newBook);

        return response.status(201).send(book);
    } catch(error) {
        console.log(error.message);
        response.status(500);
    }

});

//route to get all books from database
router.get('/', async (request, response) => {
    try {
        const books = await Book.find({});   
        return response.status(200).send({
            count: books.length,
            data: books
        });
    } catch(error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
})

//route to get details of one book
router.get('/:id', async (request, response) => {
    try {
        const id = request.params.id;
        const book = await Book.findById(id);   
        return response.status(200).json(book);
    } catch(error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
})

//route to update a book
router.put('/:id', async (request, response) => {
    try {
        if(!request.body.title 
            || !request.body.author 
            || !request.body.publishYear)
        {
            return response.status(400).send({
                message: 'Send all required fields: title, author, publishYear',
            });
        }

        //get the book by getting id from params
        const { id } = request.params;

        //updating the book by using request body
        const result = await Book.findByIdAndUpdate(id, request.body);
        
        if(!result) {
            return response.status(404).json({ message: 'Book not found' });
        } else {
            return response.status(200).json({
                result: result,
                message: 'Book updated successfully'
            });
        }

    } catch(error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }

})

//route for deleting a book
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Book.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({ message: 'Book Not Found' });
        }

        return response.status(200).json({
            message: `Book Deleted successfully with id: ${id}`
        })
    } catch(error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
})

export default router;