const Team = require('../models/Team')
const {validationResult} = require('express-validator')

exports.createTeam = async(req,res) =>{
    
    console.log(req.body)
    const errores = validationResult(req)
    if (!errores.isEmpty()) {
        return res.status(400).json({errores: errores.array()})
    }

    try{
        const team = new Team(req.body)
        await team.save()

        res.json(team)

    }catch(error){
        console.log(error)
        res.status(500).send('Hubo un error')
    }
}


exports.getTeams = async(req,res) => {
    try {
        const team = await Team.find()
        res.json(team)
    } catch (error) {
        console.log(error)
        res.status(500).send('Hubo un error')
    }
}

exports.editTeam = async(req,res)=>{

    const errors = validationResult(req)
    if(!errors.isEmpty){
        return res.status(400).json({errores:errors.array()})
    }

    const {name} = req.body
    const newTeam = {}

    if(name){
        newTeam.name = name
    }

    try {

        let team = await Team.findById(req.params.id)
        console.log((team.name))
        if(!team){
            return res.status(404).json({msg:'Equipo no encontrado'})
        }

        team = await Team.findByIdAndUpdate(
            {_id: req.params.id},
            {$set: newTeam},
            {new:true}
        )

        res.json({team})

    } catch (error) {
        console.log(error)
        res.status(500).send('Error en el servidor')
    }
}
exports.deleteTeam = async (req,res) =>{
    try {
        let team = await Team.findById(req.params.id)
        if(!team){
            return res.status(404).json({msg:'Equipo no encontrado'})
        }

        await Team.findByIdAndUpdate(
            {_id:req.params.id},
            {status:true}
        )
        res.json({msg:'Equipo eliminado'})
    } catch (error) {
        console.log(error)
        res.status(500).send('Error en el servidor')
    }
}

