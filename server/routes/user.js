const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


//Create, find,update, delete
router.get('/', userController.view);

//Router
// router.get('', (req,res)=>{
//     res.render('home');
// });

module.exports = router;