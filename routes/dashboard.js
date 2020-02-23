var express = require('express');
var router = express.Router();
var userModule=require('../modules/user');
var bcrypt=require('bcryptjs');
var jwt = require('jsonwebtoken');
var passCatModel = require('../modules/password_category');
var passModel=require('../modules/add_password')
var getPassCat= passCatModel.find({});
const { check, validationResult } = require('express-validator');

var getAllPass= passModel.find({});

/* GET home page. */
if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}

function checkLoginUser(req,res,next){
  var userToken=localStorage.getItem('userToken');
  try {
    var decoded = jwt.verify(userToken, 'loginToken');
  } catch(err) {
    res.redirect('/');
  }
  next();
}


function checkEmail(req,res,next){
  var email=req.body.email;
  var checkexitemail=userModule.findOne({email:email});
  checkexitemail.exec((err,data)=>{
 if(err) throw err;
 if(data){
  
return res.render('signup', { title: 'Password Management System', msg:'Email Already Exit' });
//this is returned so that if the email check fails it will restart the page other it will not go to this page.
 }
 next();
  });
}
function checkUsername(req,res,next){
  var uname=req.body.uname;
  var checkexituser=userModule.findOne({username:uname});
  checkexituser.exec((err,data)=>{
 if(err) throw err;
 if(data){
  
return res.render('signup', { title: 'Password Management System', msg:'Username Already Exit' });

 }
 next();
  });
}
router.get('/',checkLoginUser, function(req, res, next) {
    var loginUser=localStorage.getItem('loginUser');
    res.render('dashboard', { title: 'Password Management System',msg:"",loginUser:loginUser });
  });

  module.exports = router;  