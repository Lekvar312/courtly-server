import express from 'express';
import authController from '../controllers/authController.js';
import { validationMiddleware } from '../middleware/validationMiddleware.js';
import { signupValidationSchema, loginValidationSchema } from '../validation/authValidationSchema.js';

const router = express.Router();

// Реєстрація
router.post('/signup', signupValidationSchema, validationMiddleware, authController.signup);

// Вхід
router.post('/login', loginValidationSchema, validationMiddleware, authController.login);

// Вихід
router.post('/logout', authController.logout);

// Оновлення токену
router.get('/refresh', authController.refresh);

export default router;
