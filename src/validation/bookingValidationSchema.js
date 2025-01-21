import { checkSchema  } from "express-validator";

export const bookingValidationSchema = checkSchema({
  date:{
    trim: true,
    notEmpty:{
      errorMessage: "Ви повинні вказати дату"
    },
    isDate: {
      errorMessage: "Не відповідає формату дата"
    }
  },
  startTime:{
    trim: true, 
    notEmpty:{
      errorMessage: "Ви повинні вказати початковий час бронювання"
    },
    isString:{
      errorMessage: "Це поле повинне бути рядком"
    },
  },
  endTime:{
    trim: true, 
    notEmpty:{
      errorMessage: "Ви повинні вказати кінцевий час бронювання"
    },
    isString:{
      errorMessage: "Це поле повинне бути рядком"
    },
  }
})