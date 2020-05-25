const express = require('express')
const {check} = require('express-validator')

const teamController = require('../controllers/teamController')
//const auth = require('../middleware/auth')

const router = express.Router()

router.post('/',
    [
        check('name','El nombre del equipo es obligatorio').not().isEmpty(),
        check('name','El nombre debe ser minimo de 2 caracteres').isLength({min:2}),
    ],
    teamController.createTeam
)

router.get(
    '/',
    teamController.getTeams
)

router.put(
    '/:id',
    [
        check('name','El nombre del proyecto es obligatorio').not().isEmpty()
    ],
    teamController.editTeam
)

router.put(
    '/desactivate/:id',
    teamController.deleteTeam
)

module.exports = router