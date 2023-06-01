const UserModel = require('../models/appModel.js')
const bcrypt = require('bcrypt')


//@desc Register a User
//@route POST  /users/register
const register = async (req, res)=>{
    const {username, email, password, confirmpassword,admin} = req.body;

    try{

        const existUsername = await UserModel.findOne({username})
        if(existUsername) return res.status(400).json("Username already exist")

        const existEmail = await UserModel.findOne({email})
        if(existEmail) return res.status(409).json("User Already Exist")
        
        if(password.length < 8)return res.status(408).json('Password')
        const hashedPassword = await bcrypt.hash(password, 10)
        if(password != confirmpassword)return res.staus(408).json('confirm Password')
        const user = await UserModel.create({
            username,
            email,
            password: hashedPassword,
            admin: admin || false
        })
        console.log(user)
        res.status(201).redirect('login')
    } catch(err){
        res.status(500).send(err.message)
    }
}

//@desc Login a User
//@route POST /users/login
const login = async(req, res)=>{
    try {
        const {username, password} = req.body
        
        const user = await UserModel.findOne({username})
        
        if(!user) return res.status(404).json({message: 'invalid'})
        
        const checkPassword = await bcrypt.compare(password, user.password)
        
        if(!checkPassword ) return res.status(400).json({message: 'Imvalid password'})
     
        req.session.user = username
        res.status(200).redirect('/')
    } catch(err){
        res.status(500).send("Internel Error..", err.message)
    }

}

//@desc Logout
//@route DELETE /users/logout
const logout = (req, res)=>{
    req.session.destroy(err => {
        if(err) res.status(500).json({err})
        else res.status(200).json({msg: "success"})
    })
}

module.exports = {register, login, logout}