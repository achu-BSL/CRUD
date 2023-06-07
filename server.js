const express = require('express');
const userRouter = require('./routers/userRoutes.js')
const adminRouter = require('./routers/adminRoutes.js')
const path = require('path')
const mongoose = require('mongoose')
const session = require('express-session')
const cookie = require('cookie-parser')
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;


//connect
mongoose.connect("mongodb://127.0.0.1:27017/user_management_system")
 .then(()=>{
    console.log("database connected..")
 })
 .catch(err=>{
    console.log(err.message)
 })



//Using parsing middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//Using rest middlewares
app.use(session({
    secret: "your_session_secret_here",
    saveUninitialized: false,
    resave: false
}))
app.use("/users", userRouter) 
app.use("/admin", adminRouter)
// app.use('/admin')
app.use('/css', express.static(path.resolve(__dirname, 'assets/css')))
app.use('/img', express.static(path.resolve(__dirname, 'assets/img')))
app.use('/js', express.static(path.resolve(__dirname, 'assets/js')))

app.set('view engine', 'ejs')


//home router
app.get("/", (req, res)=>{
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate')
    if(req.session.admin)return res.redirect('/admin')
    if(req.session.user)res.render('home', {user: req.session.user})
    else res.redirect('/users/login')       
})



app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});