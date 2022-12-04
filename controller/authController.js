const userId = process.env.USER_ID || 'testUser'

const isIdValid = (id) => {
  return id === userId;
};

module.exports = {
  isIdValid,
};
