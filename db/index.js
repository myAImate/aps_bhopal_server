const mongoose = require('mongoose')
const local="mongodb://127.0.0.1:27017/assessment"
const online ='mongodb+srv://myaimateuser:myaimateuser@tutorial.bb9zo.mongodb.net/tutorial?retryWrites=true&w=majority'
mongoose
    .connect(local, { 
        useNewUrlParser: true,
        useCreateIndex:true,
        useUnifiedTopology:true 
    })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db