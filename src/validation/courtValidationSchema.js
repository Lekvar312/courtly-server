import Joi from "joi";

export const createCourtValidationSchema = Joi.object({
  name: Joi.string().min(10).max(50).required().messages({
    "string.empty": "Це поле не можу бути пустим",
    "string.min" : "Це поле може містити мініму 10 символи",
    "string.max" : "Це поле може містити максимум 50 символів",
  }),
  address: Joi.string().min(10).max(70).required().messages({
    "string.empty": "Це поле не можу бути пустим",
    "string.min" : "Це поле може містити мініму 10 символи",
    "string.max" : "Це поле може містити максимум 50 символів",
  }),
  type: Joi.string().valid("football", "basketball", "tennis").required().messages({
    "string.empty": "Це поле не можу бути пустим",
    "any.only" : "Ви можете вказати тільки basketball, tennis, football"
  }),
  price: Joi.number().min(0).required().messages({
    "number.base": "Поле повинно бути числом",
    "number.min": "Поле не може бути менше 0",
  })
})


export const editCourtValidationSchema = Joi.object({
  name: Joi.string().min(10).max(50).optional().messages({
    "string.min" : "Це поле може містити мініму 10 символи",
    "string.max" : "Це поле може містити максимум 50 символів",
  }),
  address: Joi.string().min(10).max(70).optional().messages({
    "string.min" : "Це поле може містити мініму 10 символи",
    "string.max" : "Це поле може містити максимум 50 символів",
  }),
  type: Joi.string().valid("football", "basketball", "tennis").optional().messages({
    "any.only" : "Ви можете вказати тільки basketball, tennis, football"
  }),
  price: Joi.number().min(0).optional().messages({
    "number.base": "Поле повинно бути числом",
    "number.min": "Поле не може бути менше 0",
  })
})