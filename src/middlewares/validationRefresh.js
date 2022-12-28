const User = require("../models/schemas/authModel");
const jwt = require("jsonwebtoken");
const { SECRET_KEY_REFRESH } = require("../config");

const { customError } = require("../helpers/errors");
require("dotenv").config();

const secret = SECRET_KEY_REFRESH;

const validationRefresh = async (req, res, next) => {
  try {
    const { rtoken } = req.cookies;
    if (!rtoken) {
      throw customError({ status: 400, message: " no important cookie " });
    }
    const { id, exp } = jwt.verify(rtoken, secret);

    const user = await User.findById(id);

    if (!user || !user.tokenR) {
      console.log(" Bad user ");
      throw customError({
        status: 400,
        message: "Bad user, go login/signup ",
      });
    }

    if (rtoken !== user.tokenR) {
      throw customError({
        status: 400,
        message: "Bad token, go login/signup ",
      });
    }

    if (Date.now() > exp * 1000) {
      throw customError({
        status: 400,
        message: "Token expired, go login/signup ",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = validationRefresh;
