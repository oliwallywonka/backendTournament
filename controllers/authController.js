const User = require('../models/User')
const Player = require('../models/Player')
const Organizer = require('../models/Organizer')
const Referee = require('../models/Referee')
const bcrypt = require('bcryptjs')
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')

exports.authUser = async (req,res) =>{
    const errores = validationResult(req)
    if(!errores.isEmpty()){
        return res.status(400).json({errors: errores.array})
    }

    //extrare el email y password
    const {email,password} = req.body
    
    try{
        //revisar que sea un suario registrado
        user = await User.findOne({email})
        id = user._id
        if(!user){
            return res.status(400).json({msg:'El usuario no existe'})
        }
        
        const passCorrecto = await bcrypt.compare(password,user.password)
        if(!passCorrecto){
            return res.status(400).json({msg:'password Incorrecto'})
        }

        player = await Player.findOne({user: id})
        organizer = await Organizer.findOne({user:id})
        referee = await Referee.findOne({user:id})

        var rol
        
        if(player){
            rol = 'player'
        }

        if(organizer){
            rol = 'organizer'
        }

        if(referee){
            rol = 'referee'
        }

        // Si todo es correcto creamos el JWT
        //Crear y firmar el JWT
        var payload = {
             user:{
                 id: user.id,
                 email: user.email,
                 rol: rol
            } 
        }

        //firmar el JWT
        jwt.sign(payload,process.env.SECRETA,{
            expiresIn: 3600
        },async (error,token) => {
            if(error) throw error

            //Mensaje de confirmacion
            nuevoToken = await User.findByIdAndUpdate(
                    {_id: user.id},
                    {token: token},
                    {new:true}
                )
            res.json({token})
        })
        
    }catch(error){
        console.log(error)
    }
}