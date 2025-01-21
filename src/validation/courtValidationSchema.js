import { checkSchema } from "express-validator";

export const courtValidationSchema = checkSchema({
  name:{
    trim: true,
    notEmpty:{
      errorMessage: "Ви не вказали назву майданчика"
    },
    isLength:{
      options: {max: 50},
      errorMessage: `Це поле може містити максимум 50 символів`
    },
    isString: {
      errorMessage: "Це поле повинно бути рядком"
    }
  },
  address:{
    trim: true,
    notEmpty:{
      errorMessage: "Ви не вказали адресу майданчика"
    },
    isLength:{
      options: {max: 100},
      errorMessage: `Це поле може містити максимум 100 символів`
    },
    isString: {
      errorMessage: "Це поле повинно бути рядком"
    }
  },
  type: {
    notEmpty: {
      errorMessage: "Ви повинні вказати тип майданчика"
    },
    isIn:{
      options: [['football', 'tennis', 'basketball']],
      errorMessage: "Тип майданчика може бути тільки: football, tennis, basketball"
    },
  },
  price: {
    trim: true, 
    toInt: true,
    isInt: {
      errorMessage: "Це поле повинне бути цілим числом",
      options: { min: 0 } 
    },
    notEmpty: {
      errorMessage: "Ви не вказали ціну"
    }
  },
  'workingHours.startTime':{
    trim: true, 
    notEmpty:{
      errorMessage: "Ви повинні вказати початок роботи"
    },
    isString:{
      errorMessage: "Це поле повинне бути рядком"
    },
    optional:{
      options:{ nullable: true }
    },
  },
  'workingHours.endTime':{
    trim: true, 
    notEmpty:{
      errorMessage: "Ви повинні вказати кінець роботи"
    },
    isString:{
      errorMessage: "Це поле повинне бути рядком"
    },
    optional:{
      options:{ nullable: true }
    },
  }
})