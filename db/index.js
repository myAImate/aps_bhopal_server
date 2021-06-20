const mongoose = require('mongoose')
const local="mongodb://127.0.0.1:27017/contents"
const online ="mongodb+srv://myaimate:dbpass@myaimate.yudzv.mongodb.net/contents?retryWrites=true&w=majority"
mongoose
    .connect(online, { 
        useNewUrlParser: true,
        useCreateIndex:true,
        useUnifiedTopology:true 
    })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db