const mongoose = require('mongoose')

const RefereeSchema = mongoose.Schema(
    {   
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        ci:{
            type: String,
            required:true,
        },
        cel:{
            type: Number,
            required:true
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

module.exports = mongoose.model('Referee',RefereeSchema)