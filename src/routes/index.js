import express from 'express'
import userRoutes from './userRoutes.js'
import courtRoutes from './courtRoutes.js'
import bookingRoutes from './bookingRoutes.js'
import authRoutes from  './authRoutes.js'
import path from 'path';

const router = express.Router()

router.use('/static', express.static(path.resolve('src', 'static')))

router.get('/test', (req, res) => {
  res.json({message: "API is working!"})
})
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/courts', courtRoutes);
router.use('/booking', bookingRoutes);

export default router