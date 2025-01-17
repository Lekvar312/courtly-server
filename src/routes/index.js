import express from 'express'
import userRoutes from './userRoutes.js'
import courtRoutes from './courtRoutes.js'
import bookingRoutes from './bookingRoutes.js'
const router = express.Router()

router.get('/test', (req, res) => {
  res.json({message: "API is working!"})
})
router.use('/users', userRoutes);
router.use('/courts', courtRoutes);
router.use('/booking', bookingRoutes);

export default router