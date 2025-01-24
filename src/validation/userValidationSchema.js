import Joi from "joi";

export const createUserValidationSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    "string.empty": "Це поле не можу бути пустим",
    "string.min" : "Це поле може містити мініму 3 символи",
    "string.max" : "Це поле може містити максимум 20 символів",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "Це поле не можу бути пустим",
    "string.email" : "Не праивльно задана електронна адреса",
  }),
  password: Joi.string().min(8).max(20).required().messages({
    "string.empty": "Це поле не можу бути пустим",
    "string.min" : "Пароль повинен містити мінімум 8 символів",
    "string.max" : "Пароль може містити максимум 20 символів",
  }),
})


export const editUserValidationSchema = Joi.object({
  name: Joi.string().min(3).max(20).optional().messages({
    "string.empty": "Це поле не можу бути пустим",
    "string.min" : "Це поле може містити мініму 3 символи",
    "string.max" : "Це поле може містити максимум 20 символів",
  }),
  email: Joi.string().email().optional().messages({
    "string.empty": "Це поле не можу бути пустим",
    "string.email" : "Не праивльно задана електронна адреса",
  }),
  password: Joi.string().min(8).max(20).optional().messages({
    "string.empty": "Це поле не можу бути пустим",
    "string.min" : "Пароль повинен містити мінімум 8 символів",
    "string.max" : "Пароль може містити максимум 20 символів",
  }),
})