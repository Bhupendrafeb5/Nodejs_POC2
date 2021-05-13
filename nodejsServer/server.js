const express = require('express')
const bcrypt = require('bcrypt')
const app = express();
const jwt = require('jsonwebtoken')
require("dotenv").config();

const users = []
const posts = [{
    username: 'Ramesh',
    post: 1
}, {
    username: 'Bhupendra',
    post: 2
}
]

app.use(express.json())
app.use(function(req, res, next) {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");
    next();
  });

app.post('/posts',authenticate,(req,res)=>{
   
    console.log(req.body)
    const user=req.body.username
    const post=posts.filter(post=>post.username === user)
    console.log(post)
    res.json(post)
})

app.get('/users',authenticate, (req, res) => {

    res.send(users)

})

app.get('/home/details',(req,res)=>{
    res.write(`<h1>Welcome to Home page</h1>`)
    res.send()
})
app.post('/users', async (req, res) => {

    const salt = await bcrypt.genSalt()
    console.log("salt: ", salt)
    const hashPassword = await bcrypt.hash(req.body.password, salt)
    console.log(req.body)
    const user = { username: req.body.username, password: hashPassword }
    users.push(user);
    res.status(201).send()

})

app.post('/user/login', async (req, res) => {
    const user = users.find((user) => user.username === req.body.username)
    console.log(user);
    if (user.username == null) {
        console.log('not found')
        res.status(400).send('User not found')
    } else if (user != null) {
        console.log('user found')
        const hashPassword = await bcrypt.hash(req.body.password, 10)
        const passwordDB = user.password
        const login = await bcrypt.compare(req.body.password, passwordDB);
        console.log('login status: ', login)
        if (login) {
            const username=req.body.username;
            const accessToken=generateToken(username) //jwt.sign(username,process.env.ACCESS_TOKEN_SECRET,{expiresIn: '15s' })
            console.log('after comparing')
           // res.status(200).send('login sucessfull')
           res.json({accessToken:accessToken})
        }

    }
})

app.post('/validateToken',(req,res)=>{
    const token=req.body.token;
    console.log(token)
  
   jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err)=>{
    if(err){
        console.log("err: ",err)
     res.json({status:'invalid token'})
    }else{
        console.log('success')
        res.json({status:'valid token'})
    }
})
   
})

function generateToken(username){
    user={username:username}
   return  jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{expiresIn: '15m' })
}


 function authenticate(req,res,next){
    console.log(req.headers)
    const authHeader= req.headers['authorization']
    console.log(authHeader)
    const token=authHeader && authHeader.split(' ')[1]
    if(token == null){
        return res.sendStatus(401)
    }
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
        if(err){
            console.log('err',err)
           res.sendStatus(403)
        }else{
           // res.header("Access-Control-Allow-Origin", "*");
           // res.header("Access-Control-Allow-Credentials", true);

            req.user=user;
            next();
        }
          
           
        
         
    })
   }






app.listen(3000)

