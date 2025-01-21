import express from 'express'
import courtController from '../controllers/courtController.js'
import { courtValidationSchema } from '../validation/courtValidationSchema.js'
import { validate } from "../middleware/validation.js"

const router = express.Router()

router.post('/', courtValidationSchema, validate, courtController.createCourt)

router.get('/', courtController.getCourts)

router.get('/:id', courtController.getCourtById)

router.put('/:id', courtValidationSchema, validate, courtController.editCourt)

router.delete('/:id', courtController.deleteCourt)

export default router