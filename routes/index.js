var express = require('express');
var router = express.Router();
var userModule=require('../modules/user');
var bcrypt=require('bcryptjs');
/* GET home page. */

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

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Password Management System',msg:"" });
});

router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Password Management System',msg:"" });
});

router.post('/signup',checkUsername,checkEmail, function(req, res, next) {
  var username=req.body.uname;
  var password=req.body.password;
  var confpassword=req.body.confpassword;
  var email=req.body.email;
 
  if(password!=confpassword)
  {
    res.render('signup', { title: 'Password Management System',msg:"Confirm Password doesn't match" });
  }
  else{
    
    password=bcrypt.hashSync(req.body.password,10);
    var userDetails=new userModule({
      username:username,
      email:email,
      password:password,
        });
    userDetails.save((err,data)=>{
    if(err) throw err;
    res.render('signup', { title: 'Password Management System',msg:"User succesfully registered" });
      });
    }
  
});

router.get('/passwordCategory', function(req, res, next) {
  res.render('password_category', { title: 'Password Management System',msg:"" });
});

router.get('/add-new-category', function(req, res, next) {
  res.render('addNewCategory', { title: 'Password Management System' ,msg:""});
});

router.get('/add-new-password', function(req, res, next) {
  res.render('add-new-password', { title: 'Password Management System',msg:"" });
});
router.get('/view-all-password', function(req, res, next) {
  res.render('view-all-password', { title: 'Password Management System',msg:"" });
});
module.exports = router;
