var express = require('express');
var path = require('path');
var app = express();
var fs = require('fs');
var express = require('express');
var router = express.Router();
var db=require('./database');
// const passport              =  require("passport"),
//       // bodyParser            =  require("body-parser"),
//       LocalStrategy         =  require("passport-local"),
//       passportLocalMongoose =  require("passport-local-mongoose"),
//        mongoose = require ("mongoose")
       const cookieParser = require("cookie-parser");
       const sessions = require('express-session');
       const oneDay = 1000 * 60 * 60 * 24;
// var logger = require('morgan');

// var exphbs=require('express-handlebars')
// var expressValidator = require('express-validator');
// var flash = require('express-flash');
// var session = require('express-session');
var bodyParser = require('body-parser');
// passport.serializeUser(User.serializeUser());       //session encoding
// passport.deserializeUser(User.deserializeUser());   //session decoding
// passport.use(new LocalStrategy(User.authenticate()));
app.set("view engine","ejs");
app.use(bodyParser.urlencoded(
      { extended:true }
))
// app.use(passport.initialize());
// app.use(passport.session());
 
// var mysql = require('mysql');
var connection  = require('./database');
// mongoose.connect("mongodb+srv://<shahenda amien>:<shosho1942001>@cluster0.ru5op.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
const e = require('express');
 
// var authRouter = require('./routes/auth');
 
//session middleware
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
// var registrationRouter = require('./routes/registration-route');
// app.use('/', registrationRouter);

// a variable to save a session
// var session;
// var u = fs.readFileSync('users.json');
// var obj = JSON.parse(u);

// let data = {
//   "list": [
//     {username:"noha","password":"abc"},
//     {username:"shahenda",password:"abc"},
//     {username:"ahmed",password:"abc"}
// ]}


// //mongoose connection
// async function main(){
//   var mongoose = require('mongoose');

//   var url = 'mongodb+srv://admin:admin@cluster0.uhgcb.mongodb.net/mydb?retryWrites=true&w=majority';
//   mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});
  
//   db = mongoose.connection;

//   db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// }
// main().catch(console.sever);
// users
// var u = fs.readFileSync('users.json');
// var obj = JSON.parse(u);

// console.log(obj.username);

// let data = {
//   "list": [
//     {username:"noha","password":"abc"},
//     {"username":"shahenda","password":"abc"},
//     {"username":"ahmed","password":"abc"}
//  ]}

//  for (var x in obj) {
//    if(obj[x].username =="noha"){
//     console.log('found')
//  }
// }

	app.get('/', function(req, res){
		res.render('register', {tittle: "express"})
	  });
//     app.get('/', function(req, res){
// 	res.cookie("userData", obj);
// 	res.send('user data added to cookie')
//   alert("cookie saved")
// });
//     app.post('/', function(req, res){
// 	res.render('home',{tittle: "express"})
// });
// app.post('/', function(req, res){
  
//   var name = req.body.username;
//   var pass = req.body.password;

//   if(data.list.find( record => record.username === name)){
//     if(data.list.find( record => record.password === pass)){
//       res.cookie("userData", obj);
//       res.render('blog',{tittle: "express"})
//     }
//   }
//   else{
//     console.log('user not found!');
//   }
// });
app.post('home',function(req,res){
res.render('blog',{tittle: "express"})
});
app.get('/login', function(req, res){
  res.render('login',{tittle: "express"})
});
app.use("/cookies", (req, res) => {
  res.cookie('sessionId', sessions, {
    secure: true,
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
    })
    
});
// app.get('/cookie',function(req,res){
//   res.render('home',{tittle: "express"})
// });

app.post('/login', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			if (results!=0) {
        // response.writeHead(200, {
        //   "Set-Cookie": "token=encryptedstring; HttpOnly",
        //   "Access-Control-Allow-Credentials": "true"
        // })
        // response.send()
        request.session.loggedin = true;
				request.session.username = username
        // // WriteCookie(username,passwordd)
        // response.send();
        // response.cookie('username', 'password') // options is optional
        // response.send('')

				response.render("home");
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

app.get('/reset_pass',function(req,res){
  res.render('reset_pass',{tittle: "express"})
})

app.post('/reset_pass',function(req,res){
  inputData ={
  username :req.body.username,
  newpassword: req.body.new_psw}
  var sql='SELECT * FROM registration WHERE username=?';
db.query(sql, [inputData.username] ,function (err, data, fields) {
// if(data.length>1){
//  var msg = inputData.email+ "was already exist";
// }else if(inputData.confirm_password != inputData.password){
// var msg ="Password & Confirm Password is not Matched";
// }else{
 
// save users data into database
var sql = 'INSERT INTO registration SET ?';
db.query(sql, inputData, function (err, data) {
       });
res.render('home',{tittle: "express"})
});})
// app.get("/h",(req,res)=>{
//   res.render("cookie");
// });
// app.post("/h",(req,res)=>{
//   res.WriteCookie();
//   res.render("cookie");
// });

// app.post("/login",passport.authenticate("local",{
//   successRedirect:"/userprofile",
//   failureRedirect:"/login"
// }),function (req, res){
//   res.render("cookie")
// });
// app.get("/register",(req,res)=>{
//   res.render("register");
// });
// app.post("/register",(req,res)=>{
  
//   User.register(new User({username: req.body.username,phone:req.body.phone,telephone: req.body.telephone}),req.body.password,function(err,user){
//       if(err){
//           console.log(err);
//           res.render("register");
//       }
//   passport.authenticate("local")(req,res,function(){
//       res.redirect("/login");
//   })    
//   })
// })
app.get("/logout",(req,res)=>{
  res.clearCookie('sessionId', {
    secure: true,
    httpOnly: true,
    sameSite: 'lax'
    })
    
  res.redirect("/login");
});
function isLoggedIn(req,res,next) {
  if(req.isAuthenticated()){
      return next();
  }
  res.redirect("/login");
}
//  cba6fd1365417bebec661ae502bf253db745b324
// app.get('/logout', (req, res)=>{
// 	//it will clear the userData cookie
// 	res.clearCookie('userData');
// 	res.send('user logout successfully');
// });


///for search and adding tiitles
let tittles = ['Episode 1','Episode 2','Episode 3','Episode 4','Episode 5','Episode 6','Episode 7','Episode 8', 'Episode 9','Episode 10']

//blog page omments
let comments = ['good ',' very good',' bad ']

module.exports = tittles;
module.exports = comments;



app.get('/home',function(req,res){
  res.render('home',{tittle: "express"})
});

app.post('/add', function(req, res){
  let tittle = req.body.tittle;
  tittles.push(tittle);  
  console.log(tittles);
})

app.post('/add_comment', function(req, res){
  let comment = req.body.comment;
  comments.push(comment);  
  console.log(comments);
})


app.post('/search', function(req, res){
  let catname = req.body.query;
  if(tittles.includes(catname)){
    console.log('found');
    res.send("found");
  } else{
    console.log('not found!');
    res.send("not found");
  }
})

app.post('/comment', function(req, res){
  res.render('blog',{tittle: "express"})
})

app.get('/blog',function(req,res){
  res.render('blog',{tittle: "express"})
})
let post={}
app.post('/post', function(req, res){
  inputData ={
    comment:req.body.search
  }
var sql='SELECT * FROM registration WHERE email_address =?';
db.query(sql, [inputData.search] ,function (err, data, fields) {
 
// save users data into database
var sql = 'INSERT INTO registration SET ?';
db.query(sql, inputData, function (err, data) {
       });})
res.render('home',{tittle: "express"})

})
app.get('/post', function(req, res){
  elements.forEach(elem => (res.send(elem*2)))
}

)



// function formValidation()
// {
// var uid = document.registration.userid;
// var passid = document.registration.passid;
// var uname = document.registration.username;
// var uadd = document.registration.address;
// var ucountry = document.registration.country;
// var uzip = document.registration.zip;
// var uemail = document.registration.email;
// var umsex = document.registration.msex;
// var ufsex = document.registration.fsex; if(userid_validation(uid,5,12))
// {
// if(passid_validation(passid,7,12))
// {
// if(allLetter(uname))
// {
// if(alphanumeric(uadd))
// { 
// if(countryselect(ucountry))
// {
// if(allnumeric(uzip))
// {
// if(ValidateEmail(uemail))
// {
// if(validsex(umsex,ufsex))
// {
// }
// } 
// }
// } 
// }
// }
// }
// }
// return false;

// } function userid_validation(uid,mx,my)
// {
// var uid_len = uid.value.length;
// if (uid_len == 0 || uid_len >= my || uid_len < mx)
// {
// alert("User Id should not be empty / length be between "+mx+" to "+my);
// uid.focus();
// return false;
// }
// return true;
// }
// function passid_validation(passid,mx,my)
// {
// var passid_len = passid.value.length;
// if (passid_len == 0 ||passid_len >= my || passid_len < mx)
// {
// alert("Password should not be empty / length be between "+mx+" to "+my);
// passid.focus();
// return false;
// }
// return true;
// }
// function allLetter(uname)
// { 
// var letters = /^[A-Za-z]+$/;
// if(uname.value.match(letters))
// {
// return true;
// }
// else
// {
// alert('Username must have alphabet characters only');
// uname.focus();
// return false;
// }
// }
// function alphanumeric(uadd)
// { 
// var letters = /^[0-9a-zA-Z]+$/;
// if(uadd.value.match(letters))
// {
// return true;
// }
// else
// {
// alert('User address must have alphanumeric characters only');
// uadd.focus();
// return false;
// }
// }
// function countryselect(ucountry)
// {
// if(ucountry.value == "Default")
// {
// alert('Select your country from the list');
// ucountry.focus();
// return false;
// }
// else
// {
// return true;
// }
// }
// function allnumeric(uzip)
// { 
// var numbers = /^[0-9]+$/;
// if(uzip.value.match(numbers))
// {
// return true;
// }
// else
// {
// alert('ZIP code must have numeric characters only');
// uzip.focus();
// return false;
// }
// }
// function ValidateEmail(uemail)
// {
// var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
// if(uemail.value.match(mailformat))
// {
// return true;
// }
// else
// {
// alert("You have entered an invalid email address!");
// uemail.focus();
// return false;
// }
// } function validsex(umsex,ufsex)
// {
// x=0;

// if(umsex.checked) 
// {
// x++;
// } if(ufsex.checked)
// {
// x++; 
// }
// if(x==0)
// {
// alert('Select Male/Female');
// umsex.focus();
// return false;
// }
// else
// {
// alert('Form Succesfully Submitted');
// window.location.reload()
// return true;
// }
// }

// if(process.env.PORT){
//   app.listen(process.env.PORT, function() {console.log('Server started')});

// }
// else{
//   app.listen(process.env.PORT, function() {console.log("Server started on port 3000")})
// }
// var QRCode = require('qrcode');

// QRCode.toDataURL(secret.otpauth_url, function(err, image_data) {
//   console.log(image_data); // A data URI for the QR code image
// });
function Letter(uname)
{ 
var letters = /^[A-Za-z]+$/;
if(uname.match(letters))
{
return true;
}
else
{
return false;
}
}
app.post('/name',function (req,res)
{ 
let name=req.body.name
if(!Letter(name))
res.send("Username must have alphabet characters only")

})
app.post('/isEmailValid',function(req,res){
  let email=req.body.email
    if(!isEmailValid(email))
    res.send("Wrong mail")
})
var emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

function isEmailValid(email) {
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if(email.match(mailformat))
  {
  return true;
  }
  else
  {
  return false;
  }}

  function password(pass){
    var passw=  /^[A-Za-z-&]\w{8,14}$/;
    if(pass.match(passw))  
    return true;
    else{
      return false;
    }}
   

app.post('/password',function(req,res){
  let pass =req.body.password;
if(!password(pass))
res.send("wrong password format");
}
    
 )
function submit(){
  if(isEmailValid())
  return true;
  else
  return false;

}
app.post('/register',function(req,res){
  inputData ={
    name:req.body.name,
    password:req.body.password,
    email:req.body.email
  }
var sql='SELECT * FROM registration WHERE email_address =?';
db.query(sql, [inputData.email] ,function (err, data, fields) {
if(data.length>1){
 var msg = inputData.email+ "was already exist";
}else if(inputData.confirm_password != inputData.password){
var msg ="Password & Confirm Password is not Matched";
}else{
 
// save users data into database
var sql = 'INSERT INTO registration SET ?';
db.query(sql, inputData, function (err, data) {
       });
var msg ="Your are successfully registered";}}),
res.render('home',{tittle: "express"})

})
  

app.listen(3000)