const fs = require('fs');
const path = require ('path');
const {v4 : uuid} = require ('uuid');

const dirCodes = path.join(__dirname,'codes'); ///Users/lakshmankishorer/Documents/AlguU-Project/algou_oc/backend/codes

if (!fs.existsSync (dirCodes)){
    fs.mkdirSync(dirCodes, {recursive:true}); //codefolder is made now 
    
}

const generateFile = async (language, code)=> {
    const jobId = uuid();
    const filename = `${jobId}.${language}`;
    const filePath = path.join(dirCodes, filename);
    fs.writeFileSync(filePath, code);
    return filePath;

};

module.exports= {
    generateFile,
}