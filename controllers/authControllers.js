
const User = require('../models/authModel')

const bcrypt = require('bcryptjs');

const { JWTGenerator } = require('../helpers/jwt')

const createUser = async (req, res) => {

    const { email, password } = req.body

    try {

        let user = await User.findOne({ email: email })

        console.log(user)

        if (user) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya hay un usuario con ese correo',

            })
        }
        user = new User(req.body)

        // encriptar contraseña
        //generar el salt
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save()

        //generer token

        const token = await JWTGenerator(user.id, user.name)

        res.status(201).json({
            ok: true,
            // msg: 'registrando usuario',
            uid: user.id,
            name: user.name,
            email: user.email,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Contacta con el administrador',
        })

    }

}

const loginUser = async (req, res) => {

    const { email, password } = req.body


    try {


        const user = await User.findOne({ email })

        console.log(user)

        if (!user) {

            return res.status(400).json({
                ok: false,
                msg: 'No hay usuario con ese email',
            })
        }

        //confirmar las ontraseñas

        const validPassword = bcrypt.compareSync(password, user.password)

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'La contraseña no es correcta',
            })
        }

        //generar token
        const token = await JWTGenerator(user.id, user.name)

        res.status(200).json({
            ok: true,
            uid: user.id,
            name: user.name,
            email: user.email,
            token

        })

    } catch (error) {
        // console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Contacta con el administrador',
        })
    }



}


const renewToken = async (req, res) => {
    const { uid, name } = req
    console.log(uid, name)

    //generar un nuevo JWS y retornarlo en la petición

    const token = await JWTGenerator(uid, name);

    res.status(200).json({
        ok: true,
        msg: 'renew del token',
        user: {
            uid,
            name
        },
        token
    })
}


module.exports = {
    createUser,
    loginUser,
    renewToken
}