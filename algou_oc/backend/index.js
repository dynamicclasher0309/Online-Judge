const express = require("express");
const cors = require("cors");
const {generateFile} = require ("./generateFile");
const {executeCpp} = require ("./executeCpp");
const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/", (req, res)=> {
    res.send("Welcome to today's hello class");
});

app.post("/run", async(req,res)=> {
    const {language = 'cpp',code} = req.body;
    if (code===undefined)
    {
        return res.status(500).json({"success":false, message: "Empty Code Body!"})
    }
    try {
        const filePath = await generateFile(language,code);
        const output = await executeCpp(filePath);
        res.json({filePath, output});
    } catch (error) {
        res.status(500).json({"success":false, message: error.message});
    }
    
})

app.listen (4000, () => {
    console.log("Listening on port 4000");
})