const express = require('express')
const { check } = require('express-validator')

const { validateInputs } = require('../middleware/validateInputs')

const { createUser, loginUser, renewToken } = require('../controllers/authControllers')

const { validarJWT } = require('../middleware/validarJWT')

const router = express.Router()



router.post('/new', [
    check('name', 'El nombre es obligatório').not().isEmpty(),
    check('email', 'El nombre es obligatório').isEmail(),
    check('password', 'El password debe tener entre 6 y 10 caracteres').isLength({ min: 6, max: 10 }),
    validateInputs
], createUser)


router.post('/', [
    check('email', 'debes escribir un email correcto').isEmail(),
    check('password', 'El pasword debe tener entre 6 y 10 caracteres').isLength({ min: 6, max: 10 }),
    validateInputs
], loginUser)


router.get('/renew', validarJWT, renewToken)






module.exports = router
