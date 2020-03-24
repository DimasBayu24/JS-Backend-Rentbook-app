const book = require('../model/book')
const response = require('../helper/response')
module.exports = {
    getBook: (req, res) => {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 6;
        const offset = (page - 1) * limit;
        book.getBookCount().then((result) => {
            const total = result[0].totalBooks;
            book.getAllBook(offset, limit)
                .then((result) => {
                    if (result[1] === undefined) {
                        response.response(res, null, 404, err, "Data not found")
                    } else {
                        response.response(res, result, 200, null, "Set of books at TAMAN BUKU DIMAS")
                    }
                })
                .catch((err) => {
                    console.log(err);
                    response.response(res, null, 404, err, "Data not found")
                })
        }).catch((err) => {
            console.log(err);

            response.response(res, null, 404, err, "Data not found")
        })

    },
    addBook: (req, res) => {
        let data = {
            title: req.body.title,
            description: req.body.description,
            img: req.body.img,
            daterelease: req.body.daterelease,
            genre: req.body.genre,
            availability: req.body.availability || "true"
        }

        book.addBook(data)
            .then((result) => {
                response.response(res, result, 200, null, "You have successfully add the book")
            })
            .catch((err) => {
                response.response(res, null, 401, err, "Something Wrong")

            })
    },
    updateBook: (req, res) => {
        const idbook = req.params.idbook
        const data = {
            title: req.body.title,
            description: req.body.description,
            img: req.body.img,
            daterelease: req.body.daterelease,
            genre: req.body.genre,
            availability: req.body.availability
        }
        // console.log(data)
        book.updateBook(data, Number(idbook))
            .then((result) => {
                response.response(res, result, 200, null, "This book has updated")
            })
            .catch((err) => {
                console.log(err)
                response.response(res, null, 404, err, "Id Book Not found")
            })
    },
    deleteBook: (req, res) => {
        const idbook = req.params.idbook
        console.log(idbook)
        book.deleteBook(Number(idbook))
            .then((result) => {
                response.response(res, result, 200, null, "This book has been deleted")
            })
            .catch((err) => {
                console.log(err)
                response.response(res, null, 404, err, "Id Book No found")
            })
    },
    sortBook: (req, res) => {
        book.getSortedBook()
            .then((result) => {
                response.response(res, result, 200, null, "sorted title with descending style")
            })
            .catch((err) => {
                response.response(res, null, 404, err, "Data not found")
            })
    },
    sortGenre: (req, res) => {
        book.getSortedGenre()
            .then((result) => {
                response.response(res, result, 200, null, "list of books sorted by genre")
            })
            .catch((err) => {
                response.response(res, null, 404, err, "Data not found")
            })
    },
    sortDate: (req, res) => {
        book.getSortedDate()
            .then((result) => {
                response.response(res, result, 200, null, "list of books sorted by its release  date")
            })
            .catch((err) => {
                response.response(res, null, 404, err, "Data not found")
            })
    },
    getAvail: (req, res) => {
        book.getAvailability()
            .then((result) => {
                response.response(res, result, 200, null, "here is the list of all available books")
            })
            .catch((err) => {
                response.response(res, null, 404, err, "Data not found")
            })
    },
    searchBookTitle: (req, res) => {
        const booktitle = req.params.booktitle
        console.log(booktitle)
        book.searchBookByTitle(booktitle)
            .then((result) => {
                response.response(res, result, 200, null, "Book found")
            })
            .catch((err) => {
                console.log(err)
                response.response(res, null, 404, err, "Book Title Not Found")
            })
    },
    rentBook: (req, res) => {
        const idbook = req.params.idbook
        const data = 'false'


        // console.log(data)
        book.getIdBook(idbook)
            .then((result) => {
                console.log(result[0].availability)
                if (result[0].availability === 'true') {
                    book.rentBook(data, Number(idbook))
                        .then((result) => {
                            response.response(res, result, 200, null, "You rent the book")
                        })
                        .catch((err) => {
                            console.log(err)
                            response.response(res, null, 404, err, "Rent Book System Error")
                        })
                } else { response.response(res, null, 404, err, "You can not rent the book") }


            })
            .catch((err) => {
                console.log(err)
                response.response(res, null, 404, err, "Book Title Not Found")
            })

    },
    returnBook: (req, res) => {
        const idBook = req.params.idBook
        let data = {}
        if (req.body.title == undefined && req.body.description == undefined
            && req.body.img == undefined && req.body.daterelease == undefined
            && req.body.genre == undefined) {
            data = {
                availability: req.body.availability

            }

        }

        // console.log(data)
        book.returnBook(data, Number(idBook))
            .then((result) => {
                // response : (res, result,status,error, message)
                response.response(res, result, 200, null, "Thank you for using our service")
            })
            .catch((err) => {
                console.log(err)
                response.response(res, null, 404, err, "You have not rent it yet")
            })
    },
    getBookById: (req, res) => {
        const id = req.params.id
        book.getIdByBook(id)
            .then((result) => {
                response.response(res, result, 200, null, "ID number")
            })
            .catch((err) => {
                console.log(err)
                response.response(res, null, 404, err, "You have not rent it yet")
            })
    }
}