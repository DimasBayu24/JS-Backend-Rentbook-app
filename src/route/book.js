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
    .post('/addbook',auth.authInfo, auth.accessToken,book.addBook)
    .patch('/rent/:idbook',auth.accessToken,book.rentBook)
    .patch('/return/:idbook',auth.accessToken, book.returnBook)
    .patch('/:idbook',auth.authInfo, auth.accessToken,book.updateBook)
    .delete('/:idbook',auth.authInfo, auth.accessToken,book.deleteBook)

module.exports = route