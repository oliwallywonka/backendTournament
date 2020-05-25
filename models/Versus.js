const mongoose = require('mongoose')

const VersusSchema = mongoose.Schema(
    {   
        referee:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Referee'
        },
        team:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Team'
        },
        game:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Game'
        },
        winner:{
            type:Boolean,
            default:null
        },
        created :{
            type: Date,
            default: Date.now()
        }
    }
)

module.exports = mongoose.model('Versus',VersusSchema)