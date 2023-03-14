//https://mongoosejs.com/docs/api/query.html

const Servicio = require('../models/servicioModel')

// recoger todos los servicios
const getServicios = async (req, res) => {

    try {
        const servicios = await Servicio.find()
        console.log(servicios)
        return res.status(200).json({
            ok: true,
            msg: 'Obteniendo todos los servicios',
            total_servicios: servicios.length,
            limit: 30,
            data: servicios
        })
    } catch (error) {
        return res.status(404).json({
            ok: false,
            msg: 'Error al obtener los servicios'
        })
    }


}

// recoger un servicio
const getServicio = (req, res) => {
    //recoger id - params
    res.status(200).json({
        ok: true,
        msg: 'Obteniendo un servicio'
    })
}

// crear un servicio
const crearServicios = async (req, res) => {

    const servicio = new Servicio(req.body)

    try {

        const servicioGuardado = await servicio.save()

        return res.status(201).json({
            ok: true,
            msg: 'crear servicio',
            servicio: servicioGuardado
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Contacta con el administrador'
        })
    }
}

// actualizar un servicio
const actualizarServicio = (req, res) => {

    res.status(200).json({
        ok: true,
        msg: 'Actializando un servicio'
    })
}


// eliminar un servicio
const eliminarServicio = (req, res) => {

    res.status(200).json({
        ok: true,
        msg: 'Eliminando un servicio'
    })
}



module.exports = {
    getServicios,
    getServicio,
    crearServicios,
    actualizarServicio,
    eliminarServicio
}