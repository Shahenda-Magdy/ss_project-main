var express = require('express');
var path = require('path');
var app = express();
var fs = require('fs');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//mongoose connection
async function main(){
  var mongoose = require('mongoose');

  var url = 'mongodb+srv://admin:admin@cluster0.uhgcb.mongodb.net/mydb?retryWrites=true&w=majority';
  mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});
  
  db = mongoose.connection;

  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
}
main().catch(console.sever);

// users
var u = fs.readFileSync('users.json');
var obj = JSON.parse(u);

// console.log(obj.username);
let data = {
  "list": [
    {username:"noha","password":"abc"},
    {"username":"shahenda","password":"abc"},
    {"username":"ahmed","password":"abc"}
]}

let eps = ['Episode 1','Episode 2','Episode 3','Episode 4','Episode 5','Episode 6','Episode 7','Episode 8', 'Episode 9','Episode 10']
  
module.exports = eps;

app.get('/', function(req, res){
	res.render('index', {tittle: "express"})
});

app.post('/', function(req, res){
  var name = req.body.username;
  var pass = req.body.password;

  if(data.list.find( record => record.username === name)){
    if(data.list.find( record => record.password === pass)){
      res.cookie("userData", obj);
      res.render('home',{tittle: "express"})
    }
  }
  else{
    console.log('user not found!');
  }
});

app.get('/home',function(req,res){
  res.render('home',{tittle: "express"})
});

app.post('/add', function(req, res){
  let tittle = req.body.tittle;
})

app.post('/search', function(req, res){
  let catname = req.body.query;
  if(eps.includes(catname)){
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
});

app.get('/logout', (req, res)=>{
	//it will clear the userData cookie
	res.clearCookie('userData');
	res.send('user logout successfully');
});


app.listen(3000)