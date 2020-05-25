const mongoose = require('mongoose')

const SponsorSchema = mongoose.Schema(
    {   
        torneo:{
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Tournament'
        },
        name:{
            type:String,
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

module.exports = mongoose.model('Sponsor',SponsorSchema)