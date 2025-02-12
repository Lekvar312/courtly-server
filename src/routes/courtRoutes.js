import express from 'express'
import courtController from '../controllers/courtController.js'
import { courtCreateValidationSchema, courtEditValidationSchema } from '../validation/courtValidationSchema.js'
import { validationMiddleware } from '../middleware/validationMiddleware.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/', authMiddleware, courtCreateValidationSchema, validationMiddleware, courtController.createCourt)

router.get('/', courtController.getCourts)

router.get('/:id', courtController.getCourtById)

router.put('/:id',authMiddleware, courtEditValidationSchema, validationMiddleware, courtController.editCourt)

router.delete('/:id',authMiddleware, courtController.deleteCourt)

export default router