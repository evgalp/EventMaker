const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  // Name validation
  if (Validator.isEmpty(data.name)) {
    errors.name = "name field is required";
  }

  // Email validation
  if (Validator.isEmpty(data.email)) {
    errors.email = "email field is required";
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = "email field is invalid";
  }

  // Password validation
  if (Validator.isEmpty(data.password)) {
    errors.password = "password field is required";
  }
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "password must be 6 to 30 characters";
  }
  if (Validator.equals(data.name, data.password)) {
    errors.password = "password and name must NOT match";
  }

  // Password confirm validation
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "password2 field is required";
  }
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "passwords must match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
