const fs = require('fs');
const path = require ('path');
const {v4 : uuid} = require ('uuid');

const dirInputs = path.join(__dirname,'inputs'); ///Users/lakshmankishorer/Documents/AlguU-Project/algou_oc/backend/codes

if (!fs.existsSync (dirInputs)){
    fs.mkdirSync(dirInputs, {recursive:true}); //codefolder is made now 
    
}

const generateInputFile = async (input)=> {
    const jobId = uuid();
    const input_filename = `${jobId}.txt`;
    const input_filePath = path.join(dirInputs, input_filename);
    fs.writeFileSync(input_filePath, input);
    return input_filePath;

};

module.exports= {
    generateInputFile,
}