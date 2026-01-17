const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (firstName.length < 4 || firstName.length > 50) {
    throw new Error("Enter a first name between 4-50 characters");
  }
  if (lastName.length < 4 || lastName.length > 50) {
    throw new Error("Enter a last name between 4-50 characters");
  }
  if (!validator.isEmail(emailId)) {
    throw new Error("Enter a valid email");
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error("Enter a strong password");
  }
};

const validateEditProfileData = (req) => {
  const ALLOWED_EDITS = [
    "firstName",
    "lastName",
    "age",
    "gender",
    "photoUrl",
    "about",
    "skills",
  ];
  const isEditAllowed = Object.keys(req.body).every((key) =>
    ALLOWED_EDITS.includes(key)
  );
  return isEditAllowed;
};

module.exports = { validateSignUpData, validateEditProfileData };
