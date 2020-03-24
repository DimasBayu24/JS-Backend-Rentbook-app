const express = require('express')
const route = express.Router()
const book = require('../controller/book')
const auth = require('../helper/auth')

route
    // .all('*',auth.authInfo)
    .get('/', book.getBook)
    .get('/:id', book.getBookById)
    .get('/availability/avail', book.getAvail)
    .get('/search/:booktitle', book.searchBookTitle)
    .get('/sortbook/title', book.sortBook)
    .get('/sortdate/date', book.sortDate)
    .get('/sortgenre/genre', book.sortGenre)
    .post('/addbook', book.addBook)
    .patch('/rent/:idbook', book.rentBook)
    .patch('/return/:idBook', book.returnBook)
    .patch('/:idbook', book.updateBook)
    .delete('/:idbook', book.deleteBook)

module.exports = route