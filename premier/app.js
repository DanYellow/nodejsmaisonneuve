var Logger = require(`./logger`)

const logger = new Logger();
logger.on(`message`, (message) => {
    console.log(`fe`, message)
})

console.log(logger.eventNames())

// const fs = require(`fs`);
// function callback(err, files) {
//     if (err) return;
//     console.log(`f`, files, process.argv)
// } 
// fs.readdir(`./`, callback)

// const args = process.argv.slice(2);
// const argsValues = args.map((arg) => {
//     return Number(arg.split(`=`)[1])
// });

// const sum = argsValues.reduce((arg, acc) => {
//     return acc + arg;
// }, 0)

// console.log(`sum`, sum)
