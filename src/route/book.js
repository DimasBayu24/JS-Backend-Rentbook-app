const express = require('express')
const route = express.Router()
const book = require('../controller/book')
const auth = require('../helper/auth')

route 
    // .all('*',auth.authInfo)
    .get('/',book.getBook)
 
    .get('/availability',book.getAvail)
    .get('/search/:booktitle',book.searchBookTitle)
    .get('/sortbook',book.sortBook)
    .get('/sortdate',book.sortDate)
    .get('/sortgenre',book.sortGenre)
    .post('/addbook', book.addBook)
    .patch('/rent/:idbook',book.rentBook)
    .patch('/return/:idbook',book.rentBook)
    .patch('/:idbook',book.updateBook)
    .delete('/:idbook', book.deleteBook)

module.exports = route