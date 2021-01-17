/**
 * Check if email is valid.
 * @param {*} email
 */
const isEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export default isEmail;
