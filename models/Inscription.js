const mongoose = require ('mongoose')

const InscriptionSchema= mongoose.Schema({
    tournament :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tournament'
    },
    team:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    },
    date: {
        type:Date
    },
    status:{
        type:Boolean,
        default:false
    },
    created:{
        type:Date,
        default:Date.now()
    }
})

module.exports = mongoose.model('Inscription',InscriptionSchema)