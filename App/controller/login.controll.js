const loginModel = require("../models/login.model");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
require("dotenv").config();

const login = (req, res) => {
  const { id, password } = req.body;
        loginModel.sign(
          [id, passwordHash(password)],
          (error, results) => {
            if (error) {
              res.status(500).json(error);
            } else {
              if (results.length < 1) {
                res.status(400).json({
                  message: "Login failed, password is wrong",
                });
              } else {
                const payload = {
                  id: results[0].id,
                  name: results[0].name,
                  id: results[0].id,
                  address: results[0].address,
                };

                const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
                  expiresIn: "7d",
                });

                res.status(200).json({
                  message: "Login success",
                  data: { token: token },
                });
              }
            }
          }
        );
      }

const passwordHash = (password) => {
  return crypto.createHash("sha256").update(password).digest("hex");
};

module.exports = {
  login,
};