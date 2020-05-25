const mongoose = require('mongoose')

const PlayerSchema = mongoose.Schema(
    {   
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        team:{
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Team'
        },
        nick:{
            type:String,
            required:true
        },
        age:{
            type:Number,
        },
        leader:{
            type:Boolean
        },
        status:{
            type:Boolean,
            default:true
        },
        created :{
            type: Date,
            default: Date.now()
        }
    }
)

module.exports = mongoose.model('Player',PlayerSchema)