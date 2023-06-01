const router = require('express').Router();
const {register, login, logout} = require('../controllers/appController.js');

router.use((req, res, next)=>{
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate')
    next()
})

//Login router
router.route('/login').get((req, res)=>{
    if(req.session.admin)return res.redirect('/admin')
    if(req.session.user)return res.redirect('/')
    res.render('login')
})
.post(login)

//register router
router.route('/register').get((req, res)=>{
    if(req.session.admin)return res.redirect('/admin')
    if(req.session.user)return res.redirect('/')
    res.render('register')
})
.post(register)

//logout router
router.delete('/logout', logout)
module.exports = router