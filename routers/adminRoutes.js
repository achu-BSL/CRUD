const router = require('express').Router()
const {
    login, 
    home, 
    getAllUser, 
    updateUser, 
    homePost, 
    logout
} = require('../controllers/adminController.js')


router.use((req, res, next)=>{
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate')
    next()
})

//Login router
router.route('/login').get((req, res)=>{
    if(req.session.admin) return res.redirect('/admin')
    res.render('admin_log')
})
.post(login)

//admin home
router.route('/').get(home)
.post(homePost)


//addUser router
router.route("/add-user").get((req, res)=>{
    if(!req.session.admin) return res.redirect('/admin/login')
    res.render('admin_addUser')
})
.post((req, res)=>{

})

//to get all user data
router.route('/api/get-all-user').get(getAllUser)


//update User Router
router.route("/update-user").get((req, res)=>{
    if(!req.session.admin) return res.redirect('/admin/login')
    res.render('updateUser')
}).put(updateUser)


//logout Router
router.delete('/logout', logout)
module.exports = router