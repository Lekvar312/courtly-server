import { checkSchema  } from "express-validator";

export const bookingValidationSchema = checkSchema({
  date:{
    trim: true,
    notEmpty:{
      errorMessage: "Ви повинні вказати дату"
    },
    isISO8601: {
      errorMessage: "Не відповідає формату дата. Використовуйте формат ISO 8601 (YYYY-MM-DD)",
    },
  },
  startTime:{
    trim: true, 
    notEmpty:{
      errorMessage: "Ви повинні вказати початковий час бронювання"
    },
    isISO8601: {
      errorMessage: "Не відповідає формату дата. Використовуйте формат ISO 8601 (YYYY-MM-DD)",
    },
  },
  endTime:{
    trim: true, 
    notEmpty:{
      errorMessage: "Ви повинні вказати кінцевий час бронювання"
    },
    isISO8601: {
      errorMessage: "Не відповідає формату дата. Використовуйте формат ISO 8601 (YYYY-MM-DD)",
    },
    custom:{
      options: (value, {req}) => {
        if (new Date(value) <= new Date(req.body.startTime)) {
          throw new Error("Кінцевий час не може бути меншим або рівним початковому часу");
        }
        return true 
      }
    }
  }
})