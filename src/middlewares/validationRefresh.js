const User = require("../models/schemas/authModel");
const jwt = require("jsonwebtoken");
const { SECRET_KEY_REFRESH } = require("../config");

require("dotenv").config();

const secret = SECRET_KEY_REFRESH;

const validationRefresh = async (req, res, next) => {
  try {
    const { rtoken } = req.cookies;
    if (!rtoken) {
      throw new Error({ status: 400, message: " no important cookie " });
    }
    const { id, exp } = jwt.verify(rtoken, secret);
    // console.log(id, exp);
    console.log(exp * 1000);
    console.log(Date.now());
    const user = await User.findById(id);
    console.log(user.token);
    console.log(user.tokenR);
    console.log(!user.tokenR);
    console.log(rtoken);
    console.log(SECRET_KEY_REFRESH);
    console.log(rtoken === user.tokenR);
    console.log(Date.now() > exp * 1000);

    if (!user || !user.tokenR) {
      console.log(" ffffffffffffiiiiiiiiiiiixxxxxxxxxx ");
      throw new Error({ status: 400, message: "Auth error, go login/signup " });
    }

    if (Date.now() > exp * 1000) {
      console.log(" bbb ");
      throw new Error({
        status: 400,
        message: "Token expired, go login/signup ",
      });
    }

    if (rtoken === user.tokenR) {
      req.user = user;
      console.log(" - - - -- - - - - - -- - - - - - - - - ");

      next();
    } else {
      throw new Error({ status: 400, message: "Auth error, go login/signup " });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = validationRefresh;
