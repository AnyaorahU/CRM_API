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
  const refreshToken = jwt.sign(
    { id: user.id },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: "7d",
    },
  );

  return refreshToken;
}

function verifyRefreshToken(refreshToken) {
  const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

  return payload;
}

function verifyAccessToken(accessToken) {
  const payload = jwt.verify(accessToken, process.env.JWT_SECRET);

  return payload;
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  verifyAccessToken,
};
