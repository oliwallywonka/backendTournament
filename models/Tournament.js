const mongoose = require('mongoose')
const TournamentSchema = mongoose.Schema(
    {   
        organizer:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Organizer'
        },
        name:{
            type: String,
            required: true
        },
        banner:{
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

module.exports = mongoose.model('Tournament',TournamentSchema)