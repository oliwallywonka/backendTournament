const express = require('express')
const {check} = require('express-validator')

const teamController = require('../controllers/teamController')
const auth = require('../middleware/auth')

const router = express.Router()

router.post(
    '/',
    auth,
    [
        check('name','El nombre del equipo es obligatorio').not().isEmpty(),
        check('name','El nombre debe ser minimo de 2 caracteres').isLength({min:2}),
    ],
    teamController.createTeam
)

router.get(
    '/:id',
    auth,
    teamController.getTeams
)

router.put(
    '/:id',
    auth,
    [
        check('name','El nombre del proyecto es obligatorio').not().isEmpty(),
        check('name','El nombre debe ser minimo de 2 caracteres').isLength({min:2})
    ],
    teamController.editTeam
)

router.put(
    '/desactivate/:id',
    auth,
    teamController.deleteTeam
)

module.exports = router