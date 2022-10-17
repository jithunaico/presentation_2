const router = require("express").Router();
const {check, validationResult}  =require("express-validator")
const{publicPosts,privatePosts}  = require("../db")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const checkAuth = require("../middleware/checkAuth");


router.get("/public",(req,res)=>{
    res.json({publicPosts})

})

router.get("/private",checkAuth,(req,res)=>{
    res.json({privatePosts})

})
module.exports = router