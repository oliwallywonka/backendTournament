const mongoose = require('mongoose')

const OrganizerSchema = mongoose.Schema(
    {   
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        name:{
            type: String,
            required: true
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

module.exports = mongoose.model('Organizer',OrganizerSchema)