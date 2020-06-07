const mongoose = require('mongoose')

const TeamSchema = mongoose.Schema(
    {   
        tournament:{
            type: mongoose.Schema.Types.ObjectId,
            ref :"Tournament"
        },
        name:{
            type: String,
            required:true,
            trim:true
        },
        logo:{
            type:String,
            trim:true
        },
        status:{
            type:Boolean,
            default:true
        },
        created :{
            type: Date,
            default: Date.now()
        },

        players:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Player'
            }
        ]
    }
)

module.exports = mongoose.model('Team',TeamSchema)