var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressValidator = require('express-validator');
var flash = require('express-flash');
var session = require('express-session');
var bodyParser = require('body-parser');
 
 
var mysql = require('mysql');
var connection  = require('./lib/db');
 
var authRouter = require('./routes/auth');
 
var app = express();
 
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
 
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
 
app.use(session({ 
    secret: '123456cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))
 
app.use(flash());
// app.use(expressValidator());
 
app.use('/auth', authRouter);
 
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
 
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
 
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
// port must be set to 3000 because incoming http requests are routed from port 80 to port 8080
app.listen(3000, function () {
    console.log('Node app is running on port 3000');
});
module.exports = app;
// a variable to save a session
var session;
// var u = fs.readFileSync('users.json');
// var obj = JSON.parse(u);

// let data = {
//   "list": [
//     {username:"noha","password":"abc"},
//     {username:"shahenda",password:"abc"},
//     {username:"ahmed",password:"abc"}
// ]}

// let modified = {
//   "list": [
//     {username:"omar",password:"abc"},
//     {username:"shahenda",password:"abc"},
//     {username:"noha",password:"abc"}
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

// app.get('/', function(req, res){
// 	res.render('index', {tittle: "express"})
// });

// app.post('/', function(req, res){
//   var name = req.body.username;
//   var pass = req.body.password;

//   if(data.list.find( record => record.username === name)){
//     if(data.list.find( record => record.password === pass)){
//       console.log('user found');
//       res.cookie("userData", obj);
//       res.render('home',{tittle: "express"})
//     }
//   }
//   else{
//     console.log('user not found!');
//   }
// });


// app.get('/reset_pass',function(req,res){
//   res.render('reset_pass',{tittle: "express"})
// })

// app.post('/reset_pass',function(req,res){

//   var username = req.body.name;
//   var newpassword = req.body.new_psw;
//   if(data.list.find( record => record.username === username)){
//     res.send("password changed");
// }});
// // app.get('/blog', (req, res)=>{
// // 	//it will clear the userData cookie
// //   res.render('index',{tittle: "express"})

// // });
// app.post('/logout', (req, res)=>{
// 	//it will clear the userData cookie
// 	res.clearCookie('userData');
// 	res.send('user logout successfully');
//   // res.render('index',{tittle: "express"})

// });


// ///for search and adding tiitles
// let tittles = ['Episode 1','Episode 2','Episode 3','Episode 4','Episode 5','Episode 6','Episode 7','Episode 8', 'Episode 9','Episode 10']

// //blog page omments
// let comments = ['good ',' very good',' bad ']

// module.exports = tittles;
// module.exports = comments;



// app.get('/home',function(req,res){
//   res.render('home',{tittle: "express"})
// });

// app.post('/add', function(req, res){
//   let tittle = req.body.tittle;
//   tittles.push(tittle);  
//   res.send('tittle added successfully');
//   console.log(tittles);
// })

// app.post('/search', function(req, res){
//   let catname = req.body.query;
//   if(tittles.includes(catname)){
//     console.log('found');
//     res.send("found");
//   } else{
//     console.log('not found!');
//     res.send("not found");
//   }
// })

// app.post('/comment', function(req, res){
//   res.render('blog',{tittle: "express"})
// })

// app.get('/blog',function(req,res){
//   res.render('blog',{tittle: "express"})
// })

// app.post('/post', function(req, res){
//   let post = req.body.post;
//   if(comments.includes(post)){
//     res.send("could not add");
//   } else{
//     comments.push(post);
//     console.log(comments);
//     res.send("your comment is added successfully");
//   }
// })


// if(process.env.PORT){
//   app.listen(process.env.PORT, function() {console.log('Server started')});

// }
// else{
//   app.listen(process.env.PORT, function() {console.log("Server started on port 3000")})
// }
// app.listen(3000);