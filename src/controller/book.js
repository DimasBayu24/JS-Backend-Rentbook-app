const book = require('../model/book')
const response = require ('../helper/response')
module.exports ={
    getBook : (req,res)=>{
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page-1) * limit;
        book.getBookCount().then((result)=>{
            const total = result[0].totalBooks;
            book.getAllBook(offset,limit)
            .then((result)=>{
                if (result[1]=== undefined){
                    response.response(res,null,404,"Data not found")
                } else{
                response.response(res,result,200,null)
                }
            })
            .catch((err)=>{
                console.log(err);
                response.response(res,null,404,"Data not found")
            })
        }).catch((err)=>{
            console.log(err);
            
            response.response(res,null,404,"Data not found")
        })
       
    },
    addBook : (req,res) =>{
        let data = {
            title : req.body.title,
            description : req.body.description,
            img : req.body.img,
            daterelease : req.body.daterelease,
            genre : req.body.genre,
            availability : req.body.availability
        }
        
        book.addBook(data)
            .then((result)=>{
                response.response(res,result)
            })
            .catch((err)=>{
                response.response(res,null,401,"Something Wrong")
                
            })
    },
    updateBook : (req,res)=>{
        const idbook = req.params.idbook
        const data = {
            title : req.body.title,
            description : req.body.description,
            img : req.body.img,
            daterelease : req.body.daterelease,
            genre : req.body.genre,
            availability : req.body.availability
        }
        // console.log(data)
        book.updateBook(data,Number(idbook))
            .then((result)=>{
                response.response(res,result)
            })
            .catch((err)=>{
                console.log(err)
                response.response(res,null,404,"Id Book No found")
            })
    },
    deleteBook : (req,res)=>{
        const idbook = req.params.idbook
        console.log(idbook)
        book.deleteBook(Number(idbook))
            .then((result)=>{
                response.response(res,result)
            })
            .catch((err)=>{
                console.log(err)
                response.response(res,null,404,"Id Book No found")
            })
    },
    sortBook : (req,res)=>{
        book.getSortedBook()
            .then((result)=>{
                response.response(res,result,200,null)
            })
            .catch((err)=>{
                response.response(res,null,404,"Data not found")
            })
    },
    sortGenre : (req,res)=>{
        book.getSortedGenre()
            .then((result)=>{
                response.response(res,result,200,null)
            })
            .catch((err)=>{
                response.response(res,null,404,"Data not found")
            })
    },
    sortDate : (req,res)=>{
        book.getSortedDate()
            .then((result)=>{
                response.response(res,result,200,null)
            })
            .catch((err)=>{
                response.response(res,null,404,"Data not found")
            })
    },
    getAvail : (req,res)=>{
        book.getAvailability()
            .then((result)=>{
                response.response(res,result,200,null)
            })
            .catch((err)=>{
                response.response(res,null,404,"Data not found")
            })
    },
    searchBookTitle : (req,res)=>{
        const booktitle = req.params.booktitle
        console.log(booktitle)
        book.searchBookByTitle(booktitle)
            .then((result)=>{
                response.response(res,result)
            })
            .catch((err)=>{
                console.log(err)
                response.response(res,null,404,"Book Title Not Found")
            })
    },
    rentBook : (req,res)=>{
        const idbook = req.params.idbook
        const data = 'false'
        

        // console.log(data)
        book.getIdBook(idbook)
        .then((result)=>{ 
            console.log(result[0].availability)
            if (result[0].availability === 'true'){
            book.rentBook(data,Number(idbook))
            .then((result)=>{
                response.response(res,result)
            })
            .catch((err)=>{
                console.log(err)
                response.response(res,null,404,"Rent Book System Error")
            })
        } else {response.response(res,null,404,"You can not rent the books")}
          
            
        })
        .catch((err)=>{
            console.log(err)
            response.response(res,null,404,"Book Title Not Found")
        })
       
    },
    returnBook : (req,res)=>{
        const idbook = req.params.idbook
        let data = {}
        if (req.body.title == undefined && req.body.description == undefined
            && req.body.img == undefined && req.body.daterelease == undefined
            && req.body.genre == undefined ){
             data = {
                availability : req.body.availability
            }
        }

        // console.log(data)
        book.returnBook(data,Number(idbook))
            .then((result)=>{
                response.response(res,result)
            })
            .catch((err)=>{
                console.log(err)
                response.response(res,null,404,"You have not rent it yet")
            })
    }
}