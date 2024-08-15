const express = require('express');
const app = express();
const cors = require("cors");
const {DBConnection} = require('./database/db.js');
const User = require('./models/Users.js')
const jwt=require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const cookieParser = require ("cookie-parser");

//middleware
// dotenv.config();
app.use(cors());
const PORT = process.env.port || 8080;
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
DBConnection();

app.get("/", (req,res)=>{
    res.send("Hello World")
});

app.post("/register", async (req,res)=>{
    console.log(req);
    try{
        //get all the data from the request body 
        const {firstname, lastname, email, password} = req.body;
        //check that all the data should exist
        if (!(firstname && lastname && email && password)){
            return res.status(400).send('Please enter all details!');
        }
        //check if user already exists
        const existingUser = await User.findOne({email})
        if (existingUser){
            return res.status(400).send("User Already Exists");
        }
        //encrypt the password
        const hashPassword = bcrypt.hashSync(password,10);
        // save the data to the database
        const user = await User.create({
            firstname,
            lastname,
            email,
            password: hashPassword,
        });
        //generate a token for user and send it
        const token = jwt.sign({id:user.__id, email}, process.env.SECRET_KEY, {
            expiresIn: "1h"
        });
        user.token = token;
        user.password = undefined;
        res.status(201).json({
            message: "You have successfully registered",
            success: true,
            user,
            token
        })
    }
    catch (error){
        console.error(error);
    }
});

app.post("/login", async (req,res)=>{
    try{
        //get all data
        const {email, password} = req.body;

        //check that all the data should exist 
        if (!( email && password)){
            return res.status(400).send('Please enter all details!');
        }
        //find the user in the database
        const user = await User.findOne({email});
        if (!user)
        {
            return res.status(401).send("User not found");
        }
        const enteredPassword = await bcrypt.compare(password, user.password)
        if (!enteredPassword)
        {
            return res.status(401).send("Password is incorrect");
        }
        const token = jwt.sign({id:user._id}, process.env.SECRET_KEY,{
            expiresIn:"1d"
        });
        user.token = token;
        user.password = undefined;
        //store cookies
        const options = {
            expires: new Date(Date.now() + 1*24*60*60*1000),
            httpOnly: true,
        };
        //match if the password is correct
        //create token
        //store cookies
        //send the token
        res.status(200).cookie("token", token, options).json({
            message: "You have successfully logged in",
            success: true,
            token,
        });
    }
    catch (error){
        console.log(error.message);
    }
});

app.listen(8000,()=>{
    console.log("Server is listening on port 8000");
})