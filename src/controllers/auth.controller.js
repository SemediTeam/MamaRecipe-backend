const authModel = require("../models/auth.model");
const form = require("../helper/form.helper");

module.exports = {
  register: (req, res) => {
    const { body } = req;
    authModel
      .postNewUser(body)
      .then(() => {
        form.success(res, {
          msg: "Registration Success",
          name: body.name,
          email: body.email,
        });
      })
      .catch((err) => {
        form.error(res, err);
      });
  },

  login: (req, res) => {
    const { body } = req;
    authModel
      .postLogin(body)
      .then((auth) => {
        form.success(res, {
          msg: "Login Success",
          email: body.email,
          auth,
        });
      })
      .catch((err) => {
        form.error(res, {
          msg: "Login Failed",
          err,
        });
      });
  },

  logout: (req, res) => {
    const bearerToken = req.header("x-access-token");
    if (!bearerToken) {
      res.json({
        msg: `Token Null!`,
      });
    } else {
      blacklistToken = {
        token: bearerToken.split(" ")[1],
      };

      authModel
        .postLogout(blacklistToken)
        .then((data) => {
          form.success(res, data);
        })
        .catch((err) => {
          form.error(res, err);
        });
    }
  },
};
