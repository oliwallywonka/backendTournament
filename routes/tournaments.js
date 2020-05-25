const express = require('express')
const {check} = require('express-validator')
const auth = require ('../middleware/auth')
const tournamentController = require('../controllers/tournamentController')
//const auth = require('../middleware/auth')

const router = express.Router()

router.post(
    '/',
    auth,
    [
        check('name','El nombre del Torneo es obligatorio').not().isEmpty(),
        check('name','El nombre debe ser minimo de 4 caracteres').isLength({min:4}),
    ],
    tournamentController.createTournament
)

router.get(
    '/',
    auth,
    tournamentController.getTournaments
)

router.put(
    '/:id',
    auth,
    [
        check('name','El nombre del Torneo es obligatorio').not().isEmpty(),
        check('name','El nombre debe ser minimo de 4 caracteres').isLength({min:4}),
    ],
    tournamentController.editTournament
)

router.put(
    '/desactivate/:id',
    auth,
    tournamentController.desactivateTournament
)

module.exports = router