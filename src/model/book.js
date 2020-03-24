const connection = require('../config/db');

module.exports = {
    getBookCount : () =>{
        return new Promise((resolve,reject)=>{
            connection.query('SELECT COUNT(*) as totalBooks FROM book',(err,result)=>{
                if(!err){
                    resolve(result)
                } else{
                    reject(new Error(err))
                }
            })
        })
    },
    getAllBook : (offset,limit) =>{
        return new Promise((resolve,reject)=>{
            connection.query('SELECT * FROM book LIMIT ?,?',[offset,limit], (err,result)=>{
                if(!err){
                    resolve(result)
                } else{
                    reject(new Error(err))
                }
            })
        })
    },
    addBook : (data) =>{
        return new Promise ((resolve,reject)=>{
            connection.query(`INSERT INTO book SET ?`,data, (err, result)=>{
                if(!err){
                    resolve(result)
                } else{
                    reject (new Error (err))
                }
            })
        })
    },
    updateBook : (data,idBook) => {
        
        // console.log(id)
        return new Promise ((resolve, reject)=>{
            connection.query(`UPDATE book SET ? WHERE id = ?`,[data,idBook],(err,result)=>{
                if (!err){
                    resolve(result)
                } else{
                    reject (new Error(err))
                }
            })
        })
    },
    deleteBook:(idbook) =>{
        console.log(idbook)
        return new Promise ((resolve, reject)=>{
            connection.query(`DELETE FROM book WHERE id = ?`,idbook,(err,result)=>{
                if (!err){
                    resolve(result)
                } else{
                    reject (new Error(err))
                }
            })
        })
    },
    getSortedBook : () =>{
        return new Promise((resolve,reject)=>{
            connection.query('SELECT * FROM book ORDER BY title', (err,result)=>{
                if(!err){
                    resolve(result)
                } else{
                    reject(new Error(err))
                }
            })
        })
    },
    getSortedGenre : () =>{
        return new Promise((resolve,reject)=>{
            connection.query('SELECT * FROM book ORDER BY genre', (err,result)=>{
                if(!err){
                    resolve(result)
                } else{
                    reject(new Error(err))
                }
            })
        })
    },
    getSortedDate : () =>{
        return new Promise((resolve,reject)=>{
            connection.query('SELECT * FROM book ORDER BY daterelease', (err,result)=>{
                if(!err){
                    resolve(result)
                } else{
                    reject(new Error(err))
                }
            })
        })
    },
    getAvailability : () =>{
        return new Promise((resolve,reject)=>{
            connection.query("SELECT * FROM book WHERE availability='true'", (err,result)=>{
                if(!err){
                    resolve(result)
                } else{
                    reject(new Error(err))
                }
            })
        })
    },
    searchBookByTitle:(booktitle) =>{
        return new Promise ((resolve, reject)=>{
            connection.query("SELECT * FROM book WHERE title LIKE CONCAT('%',?,'%')",booktitle,(err,result)=>{
                if (!err){
                    resolve(result)
                } else{
                    reject (new Error(err))
                }
            })
        })
    },
    rentBook : (availability,idBook) => {
        
        // console.log(id)
        return new Promise ((resolve, reject)=>{
            connection.query(`UPDATE book SET availability = CONCAT(' ',?,' ') WHERE id = ?`,[availability,idBook],(err,result)=>{
                if (!err){
                    resolve(result)
                } else{
                    reject (new Error(err))
                }
            })
        })
    },
    returnBook : (data,idBook) => {
        
        
        

        return new Promise ((resolve, reject)=>{
            connection.query(`UPDATE book SET ? WHERE id = ?`,[data,idBook],(err,result)=>{
                if (!err){
                    resolve(result)
                } else{
                    reject (new Error(err))
                }
            })
        })
    },
    getIdBook : (idbook) =>{
        return new Promise((resolve,reject)=>{
            connection.query('SELECT availability FROM `book` WHERE id = ? ',idbook, (err,result)=>{
                if(!err){
                    resolve(result)
                } else{
                    reject(new Error(err))
                }
            })
        })
    },
    getIdByBook : (idbook) =>{
        return new Promise((resolve,reject)=>{
            connection.query('SELECT * FROM `book` WHERE id = ? ',idbook, (err,result)=>{
                if(!err){
                    resolve(result)
                } else{
                    reject(new Error(err))
                }
            })
        })
    }
}