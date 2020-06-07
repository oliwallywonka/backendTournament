// rutas para crear usuarios 
const express = require('express')
const router = express.Router()
const playerController = require('../controllers/playerController')
const auth = require('../middleware/auth')
const {check} = require('express-validator')

//crea un usuario
//api/usuarios
router.post('/',
    [
        check('email','El email es obligatorio').not().isEmpty(),
        check('email','Agrega un email válido').isEmail(),
        check('password','El password debe se minimo de 6 caractere').isLength({min:6}),
        check('nick','El nick es obligatorio').not().isEmpty(),
        check('nick','El nick debe ser de minimo 4 caracteres').isLength({min:4}),
    ], 
    playerController.createPlayer 
)

router.get(
    '/:id',
    auth,
    playerController.getPlayers
)

router.post(
    '/team',
    auth,
    [
        check('nick','El nick es obligatorio').not().isEmpty(),
        check('nick','El nick debe ser de minimo 4 caracteres').isLength({min:4})
    ],
    playerController.createPlayerTeam
)

router.put(
    '/:id',
    auth,
    [
        check('nick','El nick es obligatorio').not().isEmpty(),
        check('nick','El nick debe ser de minimo 4 caracteres').isLength({min:4})
    ],
    playerController.editPlayer
)

router.put(
    '/desactivate/:id',
    auth,
    playerController.deletePlayer
)

module.exports = router