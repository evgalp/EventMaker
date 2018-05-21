const Validator = require("validator");
const isEmpty = require("./is-empty");
const isDate = require("./is-date");

module.exports = function valaidateProfileinput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.dateOfBirth = !isEmpty(data.dateOfBirth) ? data.dateOfBirth : "";
  data.interests = !isEmpty(data.interests) ? data.interests : "";
  data.bio = !isEmpty(data.bio) ? data.bio : "";

  if (Validator.isEmpty(data.dateOfBirth)) {
    errors.dateOfBirth = "dateOfBirth is required";
  }

  if (!isDate(data.dateOfBirth)) {
    errors.dateOfBirth = "dateOfBirth is no valid; use mm/dd/yyyy format";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
