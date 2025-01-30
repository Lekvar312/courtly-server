import express from 'express'
import courtController from '../controllers/courtController.js'
import { courtCreateValidationSchema, courtEditValidationSchema } from '../validation/courtValidationSchema.js'
import { validationMiddleware } from '../middleware/validationMiddleware.js'

const router = express.Router()

router.post('/',courtCreateValidationSchema, validationMiddleware, courtController.createCourt)

router.get('/', courtController.getCourts)

router.get('/:id', courtController.getCourtById)

router.put('/:id', courtEditValidationSchema, validationMiddleware, courtController.editCourt)

router.delete('/:id', courtController.deleteCourt)

export default router