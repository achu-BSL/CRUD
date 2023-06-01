const UserModel = require('../models/appModel.js')
const bcrypt = require('bcrypt')

//@des admin login router
//method POST
const login = async (req, res)=>{
    try {

        const {username, password} = req.body
        const admin = await UserModel.findOne({username, admin: true})
        if(!admin) return res.status(400).json({err: "admin"})

        const pass = await bcrypt.compare(password, admin.password)
        if(!pass) return res.status(400).json({err: "password"})

        req.session.admin = username
        res.status(200).json({msg: "login"})
    } catch (err) {
        res.status(500).send(err.message)
    }
}

//@des admin Home
//method GET

const home = async (req, res)=>{
    if(!req.session.admin) return res.redirect('/admin/login')
    res.render('admin_home',)
}

const homePost = async (req, res)=>{
    try{
        const {username} = req.body
        await UserModel.findOneAndDelete({username})
        res.status(200).json({msg: 'Deleted'})
    } catch (err){
        res.status(500).send(err.message)
    }
}


//@des Get all users
//method GET
const getAllUser = async (req, res)=>{
    if(!req.session.admin) return res.redirect("admin/login")
    try{
        const users = await UserModel.find({username: {$ne: req.session.admin}})
        res.status(200).json(users)
    } catch (err) {
        res.status(500).json({msg: err.message})
    }
}

//@des Update User
//method PUT
const updateUser = async (req, res)=>{
    try {

        const {admin} = req.body

        if(admin != undefined){
            const {username} = req.body

            const user = await UserModel.findOneAndUpdate(
                {username},
                {admin}
                )

                res.status(200).json({msg: `changed ${user} access`})
        } else {
            const {username, email, exUsername, exEmail} = req.body
            
            let user
            if(username != exUsername){
                user = await UserModel.findOne({username})
                if(user) return res.status(400).json({err: "username already taken"})
            }
    
            if(email != exEmail){
                user = await UserModel.findOne({email})
                if(user) return res.status(400).json({err: "email already taken"})
            }
    
            if(email === exEmail && exUsername === username) return res.status(400).json({err: "Nothing changed"})
    
            await UserModel.findOneAndUpdate({username: exUsername}, {
                username,
                email
            })
    
            res.status(200).json({msg: 'Success'})
        }

    } catch (err) {
        res.status(500).send(err.message)
    }
}

//@des Logout 
//method DELETE
const logout = (req, res)=>{
    req.session.destroy((err)=>{
        if(err) res.status(500).json({err: "Internal Error"})
        else res.status(200).json({msg: "Session Destroyed"})
    })
}

module.exports = {login, home, getAllUser, updateUser, homePost, logout}