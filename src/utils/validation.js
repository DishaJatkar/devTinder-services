const validator = require("validator");

const validateSignupData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Name is not valid!");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("EmailId is not valid!");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong enough!");
  }
};

module.exports = {
  validateSignupData,
};
