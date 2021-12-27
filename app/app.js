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
    app.post('/register', function(req, res){
	res.render('home',{tittle: "express"})
});
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
app.get('/logout', (req, res)=>{
	//it will clear the userData cookie
	res.clearCookie('userData');
	res.send('user logout successfully');
	});

if(process.env.PORT){
  app.listen(process.env.PORT, function() {console.log('Server started')});

}
else{
  app.listen(process.env.PORT, function() {console.log("Server started on port 3000")})
}

app.listen(3000)
