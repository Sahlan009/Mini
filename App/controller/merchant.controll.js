const merchantModel = require("../models/merchant.model");
const crypto = require("crypto");

const registerMerchant = (req, res) => {
  const merchantData = {
    name: req.body.name,
    phone_number: req.body.phone_number,
    password: passwordHash(req.body.password),
    address: req.body.address,
  };

      merchantModel.create(
            [
              merchantData.name,
              merchantData.phone_number,
              merchantData.password,
              merchantData.address,
            ],
            (error, results) => {
              if (error) {
                res.status(500).json(error);
              } else {
                res.status(200).json({
                  message: "Merchant has been registered.",
                });
              }
            }
          );
        };

const updateMerchant = (req, res) => {
  const merchantId = res.locals.payload.id;
  const merchantData = {
    name: req.body.name,
    phone_number: req.body.phone_number,
    address: req.body.address,
  };

          merchantModel.update(
            [
              merchantData.name,
              merchantData.phone_number,
              merchantData.address,
              merchantId,
            ],
            (error, results) => {
              if (error) {
                res.status(500).json(error);
              } else {
                res.status(200).json({
                  message: "Merchant has been updated.",
                });
              }
            }
          );
        };

const deleteMerchant = (req, res) => {
  const merchantId = res.locals.payload.id;
      merchantModel.merchantDelete([merchantId], (error, results) => {
        if (error) {
          res.status(500).json(error);
        } else {
          res.status(200).json({
            message: "Merchant has been deleted.",
          });
        }
      });
    };
 

const passwordHash = (password) => {
  return crypto.createHash("sha256").update(password).digest("hex");
};

module.exports = {
  registerMerchant,
  updateMerchant,
  deleteMerchant,
};