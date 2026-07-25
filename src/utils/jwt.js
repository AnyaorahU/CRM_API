const jwt = require("jsonwebtoken");

function generateAccessToken(user) {
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "15m" },
  );

  return token;
}

function generateRefreshToken(user) {
  const Token = jwt.sign({ id: user.id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });
  return refreshToken;
}

module.exports = { generateAccessToken, generateRefreshToken };
