import { checkSchema } from "express-validator";

export const userCreateValidationSchema = checkSchema({
  name:{
    trim: true,
    notEmpty:{
      errorMessage: "Імя користувача не може бути пустим"
    },
    isLength:{
      options:{ min: 3, max:32},
      errorMessage: "Імя користувача повинне містити не менше 3 символів і не більше 32 символів"
    },
    isString: {
      errorMessage: "Це поле повинно бути рядком"
    }
  },
  email:{
    trim: true,
    notEmpty: {
      errorMessage: "Це поле не може бути пустим",
    },
    isEmail:{
      errorMessage: "Не коректно введений email"
    },
  },
  password:{
    trim: true,
    notEmpty:{
      errorMessage: "Це поле не може бути порожнім"
    },
    isLength:{
      options:{min: 8, max: 20},
      errorMessage: "Пароль повинен містит не менше 8 символів і не більше 20 символів"
    },
    isString: {
      errorMessage: "Це поле повинно бути рядком"
    }
  },
  // role:{
  //   trim: true,
  //   notEmpty:{
  //     errorMessage: "Це поле не може бути пустим"
  //   },
  //   isIn:{
  //     options:[["admin", "user"]],
  //     errorMessage: "Ви повинні вказати admin чи user"
  //   },
  //   optional:{
  //     options:{ nullable: true }
  //   }
  // }
})  

export const userEditValidationSchema = checkSchema({
  name:{
    trim: true,
    notEmpty:{
      errorMessage: "Імя користувача не може бути пустим"
    },
    isLength:{
      options:{ min: 3, max:32},
      errorMessage: "Імя користувача повинне містити не менше 3 символів і не більше 32 символів"
    },
    isString: {
      errorMessage: "Це поле повинно бути рядком"
    },
    optional:{
      options:{ nullable: true }
    }
  },
  email:{
    trim: true,
    notEmpty: {
      errorMessage: "Це поле не може бути пустим",
    },
    isEmail:{
      errorMessage: "Не коректно введений email"
    },
    optional:{
      options:{ nullable: true }
    }
  },
  password:{
    trim: true,
    notEmpty:{
      errorMessage: "Це поле не може бути порожнім"
    },
    isLength:{
      options:{min: 8, max: 20},
      errorMessage: "Пароль повинен містит не менше 8 символів і не більше 20 символів"
    },
    isString: {
      errorMessage: "Це поле повинно бути рядком"
    },
    optional:{
      options:{ nullable: true }
    }
  },
  role:{
    trim: true,
    notEmpty:{
      errorMessage: "Це поле не може бути пустим"
    },
    isIn:{
      options:[["admin", "user"]],
      errorMessage: "Ви повинні вказати admin чи user"
    },
    optional:{
      options:{ nullable: true }
    }
  }
})