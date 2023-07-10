const express = require('express');
const morgan  = require('morgan');
const {v4 : uuidv4} = require('uuid');
const app     = express();
const path    = require('path');
const fs      = require('fs');

const PORT    = process.env.PORT || 3000;

app.get('/',(req,res)=>{
    res.send(`I'm going through the morgan app`);
})


morgan.token('id', function getid(req){
    return req.id;
})
let accessLogStream = fs.createWriteStream(path.join(__dirname,"access.log"), {flags: 'a'})

app.use(setId);
app.use(morgan(`:id :method :status :url "HTTP/:http-version"` , { stream: accessLogStream }));


app.listen(PORT,()=>{
    console.log(`The app is running on ${PORT}`)
})

function setId(req,res,next){
    req.id = uuidv4();
    next();
}