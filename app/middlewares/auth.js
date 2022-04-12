const CustomError = require("../errors"),
  { isTokenValid } = require("../utils/jwt");

const authenticateUser = async (req, res, next) => {
  try {
    let token;
    // Check header
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
    }

    if (!token) {
      throw new CustomError.UnauthenticatedError("Authentication failed!");
    }

    const payload = isTokenValid({ token });

    // Attach the user and his permissions in the req object
    req.user = {
      name: payload.name,
      id: payload.userId,
      role: payload.role,
      email: payload.email,
    };

    next();
  } catch (err) {
    next(err);
  }
};

// const authorizeRoles =

module.exports = { authenticateUser };
