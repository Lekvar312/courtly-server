import express from 'express'
import courtController from '../controllers/courtController.js'
import { validationMiddleware } from '../middleware/validationMiddleware.js'
import { createCourtValidationSchema, editCourtValidationSchema } from '../validation/courtValidationSchema.js'

const router = express.Router()

router.post('/', validationMiddleware(createCourtValidationSchema),  courtController.createCourt)

router.get('/', courtController.getCourts)

router.get('/:id', courtController.getCourtById)

router.put('/:id',  validationMiddleware(editCourtValidationSchema),  courtController.editCourt)

router.delete('/:id', courtController.deleteCourt)

export default router