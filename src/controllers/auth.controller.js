const authModel = require("../models/auth.model");
const form = require("../helpers/form.helper");
const db = require("../config/mySQL");

async function deleteOtp(otp) {
  await db.query("DELETE FROM otp WHERE otp = ?", otp);
}

module.exports = {
  register: (req, res) => {
    const { body } = req;
    authModel
      .postNewUser(body)
      .then(() => {
        form.success(
          res,
          "Registration Success, Please Check Your Email to Activated Your Account",
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
        form.success(res, "Login Success", auth, 200);
      })
      .catch((info) => {
        form.error(res, "Login Failed", info, 400);
      });
  },

  logout: (req, res) => {
    const bearerToken = req.header("x-access-token");
    if (!bearerToken) {
      form.error(res, "Token Null", "err", 400);
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

  verify: (req, res) => {
    const { tokenId } = req.params;
    if (tokenId) {
      authModel
        .verify(tokenId)
        .then((data) => {
          form.success(res, "Verify Account Success", data, 200);
        })
        .catch((err) => {
          form.error(res, "Verify Account Error", err, 500);
        });
    } else {
      form.error(res, "Token Null", "err", 500);
    }
  },

  forgot: (req, res) => {
    const { body } = req;
    authModel
      .forgot(body)
      .then((data) => {
        form.success(res, "Successfully Send Link Reset Password", data, 200);
      })
      .catch((err) => {
        form.error(res, "Error Send Link Reset Password", err, 500);
      });
  },
  
  sendOtp: (req, res) => {
    const { body } = req;
    authModel
      .sendOtp(body)
      .then(async (data) => {
        await deleteOtp(data[0].otp);
        form.success(res, "Successfully Input OTP", data, 200);
      })
      .catch((err) => {
        form.error(res, "Error Input OTP", err, 500);
      });
  },
};
