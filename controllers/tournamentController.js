const Tournament = require('../models/Tournament')
const {validationResult} = require('express-validator')

exports.createTournament = async(req,res) =>{
    
    const {name,banner} = req.body
    const errores = validationResult(req)
    if (!errores.isEmpty()) {
        return res.status(400).json({errores: errores.array()})
    }
    if (req.rol !== 'organizer') {
        return res.status(400).json({errores:'No tiene permiso para realizar esta accion' })
    }
    try{

        const tournament = new Tournament()
        tournament.name = name
        tournament.banner = banner
        tournament.organizer = req.user
        await tournament.save()

        return res.status(200).json({msg:'Torneo creado correctamente'})

    }catch(error){
        console.log(error)
        res.status(500).send('Hubo un error')
    }
}


exports.getTournaments = async(req,res) => {
    try {
        const tournament =await Tournament.find().populate('organizer')
        return res.send(tournament)
    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error')
    }
}

exports.editTournament = async(req,res)=>{

    const errors = validationResult(req)
    if(!errors.isEmpty){
        return res.status(400).json({errores:errors.array()})
    }

    const {name,banner} = req.body
    console.log(req.body)
    const newTournament = {}

    if(name){
        newTournament.name = name
    }
    if(banner){
        newTournament.banner = banner
    }

    try {

        let tournament = await Tournament.findById(req.params.id)
        if(!tournament){
            return res.status(404).json({msg:'Equipo no encontrado'})
        }

        tournament = await Tournament.findByIdAndUpdate(
            {_id: req.params.id},
            {$set: newTournament},
            {new:true}
        ) 

        return res.status(200).json({msg:'Torneo editado correctamente'})

    } catch (error) {
        console.log(error)
        res.status(500).send('Error en el servidor')
    }
}
exports.desactivateTournament = async (req,res) =>{
    try {
        let tournament = await Tournament.findById(req.params.id)
        if(!tournament){
            return res.status(404).json({msg:'Torneo no encontrado'})
        }

        await Tournament.findByIdAndUpdate(
            {_id:req.params.id},
            {status:false},
            {status:true}
        )
        res.json({msg:'Torneo desactivado exitosamente'})
    } catch (error) {
        console.log(error)
        res.status(500).send('Error en el servidor')
    }
}