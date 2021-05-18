const regex = /[a-zA-Z]/;

const validateUsername = (username) => regex.test(username);

module.exports = validateUsername;
