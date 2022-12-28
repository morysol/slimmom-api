const User = require("../models/schemas/authModel");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

const validationToken = async (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  const [bearer, token] = authHeader.split(" ");

  if (bearer === "Bearer" && token) {
    try {
      const { id } = jwt.verify(token, SECRET_KEY); // , exp
      const user = await User.findById(id);
      if (!user || !user.token) {
        throw new Error();
      }

      req.user = user;

      next();
    } catch (error) {
      if (error.message === "invalid signature") {
        error.status = 401;
        next(error);
      }

      error.message = "Not authorized";

      error.status = 401;
      next(error);
    }
  }
};

module.exports = validationToken;
