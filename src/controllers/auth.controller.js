const authModel = require("../models/auth.model");
const form = require("../helpers/form.helper");

module.exports = {
  register: (req, res) => {
    const { body } = req;
    authModel
      .postNewUser(body)
      .then(() => {
        form.success(
          res,
          "Registration Success",
          { name: body.name, email: body.email },
          200
        );
      })
      .catch((err) => {
        form.error(res, "Bad Request", err, 400);
      });
  },

  login: (req, res) => {
    const { body } = req;
    authModel
      .postLogin(body)
      .then((auth) => {
        form.success(res, "Login Success", { email: body.email, auth }, 200);
      })
      .catch((info) => {
        form.error(res, "Login Failed", info, 400);
      });
  },

  logout: (req, res) => {
    const bearerToken = req.header("x-access-token");
    if (!bearerToken) {
      form.error(res, "Token Null", err, 400);
    } else {
      blacklistToken = {
        token: bearerToken.split(" ")[1],
      };

      authModel
        .postLogout(blacklistToken)
        .then((data) => {
          form.success(res, "Logout Success", data, 200);
        })
        .catch((err) => {
          form.error(res, "Logout Failed", err, 400);
        });
    }
  },
};
