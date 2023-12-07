const express = require('express');
require('dotenv').config();
const register = require('./server/register');
const login = require('./server/login');
const deleteUser = require('./server/deleteUser');
const forgotPassword = require('./server/forgotPassword');
const editProfile = require('./server/editProfile');

const app = express();

app.use(express.json());

app.use(express.urlencoded({
    extended:true
}))

app.use('/',login);
app.use('/register',register);
app.use('/deleteUser',deleteUser);
app.use('/editProfile',editProfile);
app.use('/forgotPassword',forgotPassword);


app.listen(process.env.PORT,()=>{
    // console.log(process.env);
    console.log(`http://localhost:${process.env.PORT}`)
})