const mongoose = require('mongoose')

const TeamSchema = mongoose.Schema(
    {   
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
        }
    }
)

module.exports = mongoose.model('Team',TeamSchema)