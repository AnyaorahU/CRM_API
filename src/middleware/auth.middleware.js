const authRepository = require("../repositories/auth.repository");
const { verifyAccessToken } = require("../utils/jwt");

async function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new Error("Unauthorized");
    }
    const accessToken = authHeader.split(" ")[1];

    const payload = verifyAccessToken(accessToken);

    const user = await authRepository.findById(payload.id);

    if (!user) {
      throw new Error("Unauthorized");
    }

    req.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = authMiddleware;
