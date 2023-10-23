const User = require('../model/user-model')

const usernameValidation = {
  notEmpty: {
    errorMessage: "Username shohld not be empty"
  }
}

const emailValidation = {
  notEmpty: {
    errorMessage: "Email should not be empty"
  },
  isEmail: {
    errorMessage: "Invalid Email address"
  },
  custom: {
    options: async (value) => {
      const foundUser = await User.findOne({ email: value })
      if (foundUser) {
        throw new Error("Email already exist either login or Register with new email.")
      } else {
        return true
      }
    }
  }
}

const passwordValidation = {
  notEmpty: {
    errorMessage: "Password should not be empty"
  },
  isStrongPassword: {
    errorMessage: "The password must be at least 8 characters long and contain at least one uppercase letter, lowercase letter, number, and special character, and cannot contain any spaces or be the same as your username or email address"
  }
}


const userRegistrationSchema = {
  username: usernameValidation,
  email: emailValidation,
  password: passwordValidation
}



module.exports = { userRegistrationSchema }