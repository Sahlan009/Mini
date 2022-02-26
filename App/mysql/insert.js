const db = require('../config/db');
const crypto = require("crypto");

const dataMerchant = {
  name: "Warung Mamang",
  phone_number: "080123123",
  password: "112233",
  address: "Jalan xxx ,Kec xxxx, Kab xxx, Prov xxx",
};

const insertQuery = `INSERT INTO merchant (name, phone_number, password, address) VALUES (?, ?, ?, ?);`;

db.query(
  insertQuery,
  [
    dataMerchant.name,
    dataMerchant.phone_number,
    crypto.createHash("sha256").update(dataMerchant.password).digest("hex"),
    dataMerchant.address,
  ],
  (error, results) => {
    if (error) {
      throw err;
    } else {
      console.log(`Data merchant = "${dataMerchant.name}" insert`);
    }
  }
);

const dataProduct = [
  {
    merchant_id: 1,
    name: "Gelang Perak",
    quantity: 2,
    price: 50000,
  },
  {
    merchant_id: 1,
    name: "Gelang Emas",
    quantity: 2,
    price: 100000,
  },
];

dataProduct.forEach((value) => {
  const insertQuery = `INSERT INTO product (merchant_id, name, quantity, price) VALUES (?, ?, ?, ?);`;

  db.query(
    insertQuery,
    [value.merchant_id, value.name, value.quantity, value.price],
    (error, results) => {
      if (error) {
        throw error;
      } else {
        console.log(`Data product = "${value.name}" insert`);
      }
    }
  );
});