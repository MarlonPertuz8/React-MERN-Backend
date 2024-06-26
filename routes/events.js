/*
    Event Routes
    /api/events
*/
const { Router } =require('express'); 
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const { isDate } = require('../helpers/isDate');

const router = Router();


// Validar con JWT
router.use( validarJWT );

// Obtener eventos
router.get('/', getEventos );

router.post(
    '/',
    [
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('start','Fecha inicio es obligatoria').custom( isDate),
        check('end','Fecha finalizacion es obligatoria').custom( isDate),
        validarCampos
    ],
    crearEvento
);

router.put('/:id', actualizarEvento );

router.delete('/:id', eliminarEvento );


module.exports = router;