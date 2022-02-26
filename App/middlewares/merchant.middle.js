const merchantModel = require("../models/merchant.model");
const Validator = require("validatorjs");
const validator = require("validator");
const crypto = require( "crypto");

const createValidation = (req, res, next) => {
  Validator.register(
    "mobilePhone",
    (value) => {
      return validator.isMobilePhone(value, "id-ID");
    },
    "The phone number format is invalid"
  );

  const data = {
    name: req.body.name,
    phone_number: req.body.phone_number,
    password: req.body.password,
    password_confirmation: req.body.password_confirmation,
    address: req.body.address,
  };

  const rules = {
    name: "required|string|min:3|max:50",
    phone_number: "required|mobilePhone",
    password: "required|string|min:6|confirmed",
    address: "required|string",
  };

  const validation = new Validator(data, rules);

  if (validation.passes() === true) {
    next();
  } else {
    res.status(400).json({
      message: validation.errors.all(),
    });
  }
};

const updateValidation = (req, res, next) => {
  Validator.register(
    "mobilePhone",
    (value) => {
      return validator.isMobilePhone(value, "id-ID");
    },
    "The phone number format is invalid."
  );

  const data = {
    name: req.body.name,
    phone_number: req.body.phone_number,
    address: req.body.address,
  };

  const rules = {
    name: "required|string|min:3|max:50",
    phone_number: "required|mobilePhone",
    address: "required|string",
  };

  const validation = new Validator(data, rules);

  if (validation.passes() === true) {
    next();
  } else {
    res.status(400).json({
      message: validation.errors.all(),
    });
  }
};

const deleteValidaiton = (req, res, next) => {
  const merchantId = res.locals.payload.id;
  const password = req.body.password;

  merchantModel.getPassword([merchantId], (error, results) => {
    if (error) {
      throw error;
    } else {
      if (results[0].password === passwordHash(password)) {
        next();
      } else {
        res.status(400).json({
          message: "Password is incorrect.",
        });
      }
    }
  });
};

const passwordHash = (password) => {
  return crypto.createHash("sha256").update(password).digest("hex");
};

module.exports = {
  createValidation,
  updateValidation,
  deleteValidaiton,
};