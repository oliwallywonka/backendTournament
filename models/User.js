const mongoose = require('mongoose')

const UserSchema = mongoose.Schema(
    {   
        email:{
            type: String,
            required: true,
            trim: true
        },
        password:{
            type: String,
            required:true,
            trim: true
        },
        picture:{
            type: String
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

module.exports = mongoose.model('User',UserSchema)