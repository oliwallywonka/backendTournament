const User = require('../models/User')
const Player = require('../models/Player')
const bcryptjs = require('bcryptjs')
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
exports.createPlayer = async(req,res) => {

    //revisar si hay errores
    const errores = validationResult(req)
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()})
    }

    // extraer email y password
    const {email,password,picture,nick,age} = req.body

    try {
        //Reviasr que el usuario registrado sea unico
        let user = await User.findOne({email})

        if(user){
            return res.status(400).json({msg:'El usuario ya existe'})
        }
        
        //Guardar el nuevo usuario
        user = new User(req.body)
        //Hashear el password
        const salt = await bcryptjs.genSalt(10)
        user.password = await bcryptjs.hash(password,salt)
        user.picture = picture
        // guardar usuario
        await user.save()

        player = new Player()
        player.user = user._id
        player.nick = nick
        player.age = age
        await player.save()
        //Crear y firmar el JWT
        const payload = {
            user:{
                id: user.id,
                rol: 'jugador'
            } 
        }

        //firmar el JWT
        jwt.sign(payload,process.env.SECRETA,{
            expiresIn: 3600
        },(error,token) => {
            if(error) throw error

            //Mensaje de confirmacion
            res.json({token})
        })

        //mensaje de confirmacion
        //return res.status(200).json({msg:'Usuario creado correctamente con el rol de Jugador'})

    } catch (error) {
        res.status(400).send('Hubo un error')
    }
} 

exports.createPlayerTeam = async (req,res) =>{
    const errores = validationResult(req)
    if (!errores.isEmpty()) {
        return res.status(400).json({errores: errores.array()})
    }
    try {
        const player = new Player(req.body)
        await player.save()
        res.json(player)
    } catch (error) {
        res.status(500).send('Hubo un error')
    }
} 

exports.getPlayers = async(req,res) =>{
    try {
        const player = await Player.find({
            team : req.params.id,
            status:true
        })
        res.json(player)
    } catch (error) {
        res.status(500).send('Hubo un error')
    }
}

exports.editPlayer = async(req,res) =>{
    const errores = validationResult(req)
    if (!errores.isEmpty()) {
        return res.status(400).json({errores: errores.array()})
    }
    const {nick,age,team}=req.body
    const newPlayer = {}
    
    if(nick) {newPlayer.nick = nick}
    if(age) {newPlayer.age = age}
    if(team) {newPlayer.team = team}

    try {
        let player = await Player.findById(req.params.id)
        if(!player){
            return res.status(404).json({msg:"Jugador no encontrado"})
        }
        player = await Player.findByIdAndUpdate(
            {_id: req.params.id},
            {$set: newPlayer},
            {new:true}
        )
        res.json({player})
    } catch (error) {
        res.status(500).send('Hubo un error')
    }
}

exports.deletePlayer = async(req,res)=>{
    try {
        let player = await Player.findById(req.params.id)
        if(!player) return res.status(404).json({msg:'Jugador no encontrado'})

        await Player.findByIdAndUpdate(
            {_id:req.params.id},
            {status:false}
        )
        res.json({msg:'Juagador eliminado '})
    } catch (error) {
        res.status(500).send('Error en el servidor')
    }
}