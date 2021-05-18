const regex = /[a-zA-Z0-9]/;

const validatePassword = (password) => regex.test(password);

module.exports = validatePassword;
