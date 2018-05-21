const Validator = require("validator");
const isEmpty = require("./is-empty");
const isDate = require("./is-date");

module.exports = function validateEventInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.startDate = !isEmpty(data.startDate) ? data.startDate : "";
  data.endDate = !isEmpty(data.endDate) ? data.endDate : "";
  data.description = !isEmpty(data.description) ? data.description : "";

  if (Validator.isEmpty(data.description)) {
    errors.description = "description is required";
  }

  if (Validator.isEmpty(data.startDate)) {
    errors.startDate = "startDate is required";
  }

  if (!isDate(data.startDate)) {
    errors.startDate = "startDate is no valid; use mm/dd/yyyy format";
  }

  if (Validator.isEmpty(data.endDate)) {
    errors.endDate = "endDate is required";
  }

  if (!isDate(data.endDate)) {
    errors.endDate = "endDate is no valid; use mm/dd/yyyy format";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
