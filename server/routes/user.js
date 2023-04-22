const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


//Create, find,update, delete
router.get('/', userController.view);
router.post('/', userController.find);
router.get('/adduser', userController.form);
router.post('/adduser', userController.create);

//Router
// router.get('', (req,res)=>{
//     res.render('home');
// });

module.exports = router;