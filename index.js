require('dotenv').config();
var express = require("express");
const cors =require('cors');
const morgan = require('morgan');
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
var expressMongoDb = require('express-mongo-db');
// app.use(bodyParser({limit: '50mb'}));
app.use(bodyParser.json()); // support json encoded bodies
app.use(morgan('dev')); // support encoded bodies
app.use(cors());
app.use(expressMongoDb(process.env.MONGO_URL));

var server = app.listen(process.env.PORT, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Example app listening at %s:%s Port", host, port);
});

app.get('/',(req,res)=>{
    res.send(`server running`);
}); 

app.use('/blackjack',require('./web/routes'));
