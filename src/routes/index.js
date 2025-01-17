import express from 'express'
import userRoutes from './userRoutes.js'
const router = express.Router()

router.get('/test', (req, res) => {
  res.json({message: "API is working!"})
})
router.use('/users', userRoutes);

export default router