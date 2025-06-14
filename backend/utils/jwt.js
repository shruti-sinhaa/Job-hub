const jwt = require("jsonwebtoken");
const SECRET_KEY = "";

const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, SECRET_KEY, {
    expiresIn: "1d",
  });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET_KEY); // Verify and decode the token
  } catch (err) {
    throw new Error("Invalid or expired token.");
  }
};
module.exports = { generateToken, verifyToken };
