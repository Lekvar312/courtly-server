import Joi from "joi";

export const createBookingValidationSchema = Joi.object({
  date: Joi.date().required().messages({
    'date.base': 'Поле повинно бути датою',
    'any.required': 'Поле не може бути пустим',
  }),
  startTime: Joi.date().required().messages({
    'date.base': 'Поле повинно бути датою',
    'any.required': 'Поле не може бути пустим',
  }),
  endTime: Joi.date().greater(Joi.ref('startTime')).required().messages({
    'date.base': 'Поле повинно бути датою',
    'date.greater': 'Кінцевий час повинен бути більшим за початковий',
    'any.required': 'Поле не може бути пустим',
  }),
})

export const editBookingValidationSchema = Joi.object({
  date: Joi.date().optional().messages({
    'date.base': 'Поле повинно бути датою',
    'any.required': 'Поле не може бути пустим',
  }),
  startTime: Joi.date().optional().messages({
    'date.base': 'Поле повинно бути датою',
    'any.required': 'Поле не може бути пустим',
  }),
  endTime: Joi.date().greater(Joi.ref('startTime')).optional().messages({
    'date.base': 'Поле повинно бути датою',
    'date.greater': 'Кінцевий час повинен бути більшим за початковий',
    'any.required': 'Поле не може бути пустим',
  }),
})