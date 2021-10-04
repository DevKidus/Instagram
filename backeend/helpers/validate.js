const validateSignup = ({ email, firstname, lastname, password }) => {
  const errors = [];
  if (!email) errors.push({ email: "Email cannot be empty" });
  if (!firstname) errors.push({ firstname: "Firstname cannot be empty" });
  if (!lastname) errors.push({ lastname: "Lastname cannot be empty" });
  if (!password) errors.push({ password: "password cannot be empty" });

  if (email && !isValidEmail(email)) errors.push({ email: "Invalid email" });
  if (firstname && firstname.length < 2)
    errors.push({ firstname: "Invalid firstname" });
  if (lastname && lastname.length < 2)
    errors.push({ lastname: "Invalid lastname" });
  if (password && password.length < 6)
    errors.push({ password: "password must be atleast 6 characters" });

  return errors;
};

const validateLogin = ({ email, password }) => {
  const errors = [];

  if (!email) errors.push({ email: "Email cannot be empty" });
  if (!password) errors.push({ password: "Password cannot be empty" });

  if (email && !isValidEmail(email)) errors.push({ email: "Invalid Email" });
  if (password && password.length < 6)
    errors.push({ password: "Password can't be less than 6 characters" });

  return errors;
};

const validateNewPost = ({ content, image }) => {
  const errors = [];

  if (!content && !image) errors.push({ value: "no data" });

  if (image && !isValidImage(image))
    errors.push({ image: "Invalid extension of an image" });

  return errors;
};

function isValidEmail(email) {
  const pattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  return email.match(pattern);
}

function isValidImage(image) {
  const exts = ["png", "jpeg", "jpg"];

  let isValid = false;

  exts.forEach((ext) => {
    if (image.endsWith(ext)) isValid = true;
  });
  return isValid;
}

module.exports = { validateSignup, validateLogin, validateNewPost };
