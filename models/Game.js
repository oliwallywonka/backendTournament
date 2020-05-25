const mongoose = require ('mongoose')

const GameSchema= mongoose.Schema({
    tournament :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tournament'
    },
    date: {
        type:Date
    },
    status:{
        type:Boolean,
        default:true
    },
    created:{
        type:Date,
        default:Date.now()
    }
})

module.exports = mongoose.model('Game',GameSchema)