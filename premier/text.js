const fs = require(`fs`);
const path = require(`path`);
const { promisify } = require(`util`);
const asyncReadDir = promisify(fs.readdir)

const filePath = `./text.txt`

// Exercice 2
// const fileContent = fs.readFileSync(filePath);
// if (fileContent) {
//     console.log(`fileContent`, fileContent.toString())
// }

// // Exercice 3
// fs.readFile(filePath, (err, content) => {
//     if(err) return;
//     console.log(`fileContent`, content.toString())
// });

// Exercice 4
const fileList = async (dirPath, ext) => {
    fs.readdir(dirPath, (err, files) => {
        if(err) return;
        const filteredFiles = files.filter((file) => {
            return path.extname(file).replace(`.`, ``) === ext || (!path.extname(file) && !ext)
        }).forEach((file) => {
            console.log(file)
        })
    });

    // try {
    //     const text = await asyncReadDir(dirPath, {encoding: 'utf8'});
    //     console.log('CONTENT:', text);
    // }
    // catch (err) {
    //     console.log('ERROR:', err);
    // }
}

fileList(`./files`, `txt`)