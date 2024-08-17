const express =require('express');
const app = express();

app.get('/', (req,res)=>{
    res.send("Welcome everyone to our today's Online Compiler class!")
});

app.listen(4000, ()=>{
    console.log("Server listening on port 4000");
})