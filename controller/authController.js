const isIdValid = (id) => {
  return id === process.env.USER_ID || 'testUser';
};

const db = {
  isIdValid,
};

module.exports = db;
