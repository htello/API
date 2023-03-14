const express = require('express');
const { check } = require('express-validator')


const router = express.Router();
const { getServicios, getServicio, crearServicios, actualizarServicio, eliminarServicio } = require('../controllers/apiControllers')
const { validateInputs } = require('../middleware/validateInputs')
// recoger todos los servicios

router.get('/', getServicios)

// recoger un servicio
router.get('/:id', getServicio)


// crear un servicio
router.post('/',
    [
        check('servicio', "Debes escribir el servicio").not().isEmpty(),
        check('descripcion', "Debes escribir la descripción").not().isEmpty(),
        validateInputs
    ]
    , crearServicios)

// actualizar un servicio
router.put('/:id', actualizarServicio)

// eliminar un servicio
router.delete('/:id', eliminarServicio)




module.exports = router