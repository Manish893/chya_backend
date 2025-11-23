const express = require('express');
const app = express();
const {Client} = require('pg');
const authRouter = require('./routes/auth_routes');
const chyaRouter = require('./routes/chya_routes');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
const connection = new Client({host:'localhost',user:'postgres',port:1111,password:'Manish@22',database:'chya_shop'});
connection.connect().then(() => console.log('Database connected')).catch(err => console.log('database connection error',err));

app.set('db',connection);
app.use((req,res,next) =>{
    res.setHeader('Access-Control-Allow-Origin','*'),
    res.setHeader('Access-Control-Allow-Methods','GET,PUT,PATCH,POST,DELETE'),
    res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization'),
    next();

});


app.use((req,res,next) => {
    req.db = app.get('db');
    next();

});
app.use('/chya', authRouter);
app.use('/chyalist', chyaRouter);

app.listen(8080,(err,message) => {
    if(err){
        console.log('error starting server');

    }else{

        console.log('server is running at port 8080');
    }
})