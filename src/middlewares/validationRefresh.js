const User = require("../models/schemas/authModel");
const jwt = require("jsonwebtoken");
const { SECRET_KEY_REFRESH } = require("../config");

require("dotenv").config();

const secret = process.env.SECRET_KEY_REFRESH;

const validationRefresh = async (req, res, next) => {
  try {
    const { rtoken } = req.cookies;
    if (!rtoken) {
      throw new Error({ status: 400, message: " no important cookie " });
    }
    const { id, exp } = jwt.verify(rtoken, secret);
    const user = await User.findById(id);

    if (!user || Date.now() > exp * 1000) {
      throw new Error({ status: 400, message: "Auth error, go login/signup " });
    }

    if (rtoken === user.tokenR) {
      req.user = user;
      next();
    } else {
      throw new Error({ status: 400, message: "Auth error, go login/signup " });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = validationRefresh;
