const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
  try {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
      const error = new Error("Not authenticated auth header");
      error.statusCode = 401;
      throw error;
    }
    const token = authHeader.split(" ")[1];
    let decodedToken;
    decodedToken = jwt.verify(token, config.get("jwtSecret"));
    console.log(decodedToken);
    if (!decodedToken) {
      const error = new Error("Not authenticated decodetoken");
      error.statusCode = 401;
      throw error;
    }
    req.user = { userId: decodedToken.userId, role: decodedToken.role };
    next();
  } catch (error) {
    next(error);
  }
};
