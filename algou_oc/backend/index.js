const express = require("express");
const cors = require("cors");
const {generateFile} = require ("./generateFile");
const {generateInputFile} = require ("./generateInputFile");
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
    const {language = 'cpp',code, input} = req.body;
    if (code===undefined)
    {
        return res.status(500).json({"success":false, message: "Empty Code Body!"})
    }
    try {
        const filePath = await generateFile(language,code);
        const input_filePath = await generateInputFile(input, filePath);
        const output = await executeCpp(filePath, input_filePath);
        res.json({filePath, input_filePath, output});
    } catch (error) {
        res.status(500).json({"success":false, error: error});
    }
    
})

app.listen (4000, () => {
    console.log("Listening on port 4000");
})