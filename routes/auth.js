// rutas para autenticar usuarios 
const express = require('express')
const router = express.Router()
const {check} = require('express-validator')
const authController = require('../controllers/authController')

//crea un usuario
//api/auth
router.post('/',
    [
        check('email','Agrega un email válido').isEmail(),
        check('password','El password debe se minimo de 6 caractere').isLength({min:6})
    ],
    authController.authUser
)
module.exports = router