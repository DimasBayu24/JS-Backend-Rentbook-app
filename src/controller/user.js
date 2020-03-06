require('dotenv').config()
const user = require('../model/user');
const response = require('../helper/response');
const jwt = require('jsonwebtoken')

module.exports = {
    register : (req,res) =>{
        const salt = response.getRandomSalt(process.env.LENGTH_SALT)
        const passHash = response.setPass(req.body.password, salt)
        const data = {
            username : req.body.username,
            password : passHash.passHas,
            salt: passHash.salt
        }
        user.register(data)
          .then((result) => {
              response.response(res,result)              
          }).catch((err) => {
              response.response(res, null, 401, "Sorry Something Wrong")
          });
    },
    login : (req,res) =>{
        const username = req.body.username
        const password = req.body.password

        user.getByUserName(username)
            .then((result) =>{
                const dataUser = result[0]
                const userPass = response.setPass(password, dataUser.salt).passHas

                if(userPass === dataUser.password){
                    dataUser.token = jwt.sign({
                        username : dataUser.username,
                        id_user : dataUser.id_user
                    }, process.env.SECRET_KEY,{
                        expiresIn : '1200s'
                    })  
                    
                    delete dataUser.salt
                    delete dataUser.password
                    return response.response(res,dataUser)
                } else {
                    return response.response(res,null,403,"Wrong Password Or Username")
                }
            })
            .catch(()=>{
                return response.response(res,null,404, "Username Not Register")
            })
    }
}