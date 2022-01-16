var express = require('express');
var path = require('path');
var app = express();
var fs = require('fs');
var express = require('express');
var router = express.Router();
var db=require('./database');

       const cookieParser = require("cookie-parser");
       const sessions = require('express-session');
       const oneDay = 1000 * 60 * 60 * 24;

var bodyParser = require('body-parser');

app.set("view engine","ejs");
app.use(bodyParser.urlencoded(
      { extended:true }
))

var connection  = require('./database');

const e = require('express');

app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

	app.get('/', function(req, res){
		res.render('register', {tittle: "express"})
	  });

app.post('home',function(req,res){
res.render('blog',{tittle: "express"})
});
app.get('/login', function(req, res){
  res.render('login',{tittle: "express"})
});
app.post("/cookies", (req, res) => {
  key=req.body.username; Secure; HttpOnly; 
  res.cookie('sessionId', sessions, {
    secure: true,
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
    })
    
});

app.post('/login', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		db.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
      console.log(passwords)
	  if (passwords.includes(password)) {
        request.session.loggedin = true;
				request.session.username = username
  

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
  var sql='SELECT * FROM registration WHERE username=?AND password = ?';
db.query(sql, [inputData.username] ,function (err, data, fields) {
  passwords.push(inputData.newpassword)
var sql = 'INSERT INTO registration SET ?';
db.query(sql, inputData, function (err, data) {
       });
res.render('home',{tittle: "express"})
});})
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

let tittles = ['Episode 1','Episode 2','Episode 3','Episode 4','Episode 5','Episode 6','Episode 7','Episode 8', 'Episode 9','Episode 10']

let comments = ['good ',' very good',' bad ']
let passwords=['123']
module.exports = tittles;
module.exports = comments;



app.get('/home',function(req,res){
  res.render('home',{tittle: "express"})
});

app.post('/add', function(req, res){
  let tittle = req.body.tittle;
  res.send("title added successfully")
  tittles.push(tittle);  
  console.log(tittles);
})

app.post('/add_comment', function(req, res){
  let comment = req.body.comment;
  comments.push(comment);  
  res.send(comments)
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
 

var sql = 'INSERT INTO registration SET ?';
db.query(sql, inputData, function (err, data) {
       });})
res.render('home',{tittle: "express"})

})
app.get('/post', function(req, res){
  elements.forEach(elem => (res.send(elem*2)))
}

)

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
var emailRegex = /^[-!#$%&'+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'+\/0-9=?A-Z^_a-z`{|}~])@[a-zA-Z0-9](-\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

function isEmailValid(email) {
  var mailformat = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
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
var sql='SELECT * FROM registration WHERE username =?';
db.query(sql, [inputData.name] ,function (err, data, fields) {
if(data!=1){
 var msg = inputData.email+ "was already exist";
 passwords.push(inputData.password)

}else{
 
// save users data into database
var sql = 'INSERT INTO registration SET ?';
db.query(sql, inputData, function (err, data) {
       })};
// var msg ="Your are successfully rgistered";
res.redirect('login')

})})
  if(process.env.PORT){
  app.listen(process.env.PORT, function() {console.log('Server started')});

}
else{
  app.listen(process.env.PORT, function() {console.log("Server started on port 3000")})
}

// app.listen(3000)
