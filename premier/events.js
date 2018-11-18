const EventEmitter = require(`events`);

const emitter = new EventEmitter();
emitter.on(`evt`, (param) => {
    console.log(`message logged: `, param)
})

module.exports = emitter;
