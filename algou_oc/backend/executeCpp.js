const fs = require('fs');
const path = require ('path');
const {exec} = require('child_process');

const outputPath = path.join(__dirname,'outputs'); ///Users/lakshmankishorer/Documents/AlguU-Project/algou_oc/backend/outputs

if (!fs.existsSync (outputPath)){
    fs.mkdirSync(outputPath, {recursive:true}); //output folder is made now 
    
}

const executeCpp = async (filePath, inputPath)=> {
    const jobId = path.basename(filePath).split(".")[0]; // it will create an array and [0] will give the first element of the array which is the name of the file 
    const output_filename = `${jobId}.out`;
    const outPath = path.join(outputPath, output_filename);
    // return outPath;
    return new Promise((resolve, reject) => {
        exec(`g++ ${filePath} -o ${outPath} && cd ${outputPath} && ./${output_filename} <${inputPath}`, (error, stdout, stderr) => {
            if (error)
            {
                reject({error, stderr});
            }
            if (stderr)
            {
                reject(stderr);
            }
            resolve(stdout);
        });

    });



};

module.exports= {
    executeCpp,
}