var express=require("express")
var app=express()
var path=require('path')
var router=require('./api/userApi')
var cors = require('cors');
var bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/order-front/public/',express.static('../order-front/public/'))
app.use('/node_module/',express.static(path.join(__dirname,'./node_module/')))

app.engine('html',require('express-art-template'))
app.set('views','../order-front/src/views')

app.all('*', function(req, res, next) {  
    res.header("Access-Control-Allow-Origin", "http://localhost:8081");  
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", 'Origin,Content-Type,Cookie,Accept,Token');  
    res.header("Access-Control-Allow-Methods","POST,GET");  

    next();  
  });

app.use( router);

app.listen(3000,function(){
    console.log("running...")
})
