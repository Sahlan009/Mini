const { LONG } = require('mysql/lib/protocol/constants/types');
const db = require('../config/db')


let createmerchantQuery = `
Create table if not exists merchant (
    id int NOT NULL AUTO_INCREMENT,
    name varchar(50) NOT NULL,
    phone_number varchar(18) NOT NULL,
    password varchar(80) NOT NULL,
    address varchar(80) NOT NULL,
    join_date datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    is_deleted BOOLEAN NOT NULL DEFAULT '0',
    PRIMARY KEY (id)
  )
  COLLATE='utf8mb4_general_ci';`

  db.query(createmerchantQuery, function(error, results, fields){
    if (error) throw error;
    console.log('Table merchant has been Created');
});

  let createproductQuery = `
  Create table if not exists product (
    id int NOT NULL AUTO_INCREMENT,
    merchant_id int NOT NULL,
    name varchar(50) NOT NULL,
    quantity int NOT NULL,
    price int NOT NULL,
    created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    is_deleted tinyint(1) NOT NULL DEFAULT '0',
    PRIMARY KEY (id),
    KEY merchant_id (merchant_id),
    FOREIGN KEY (merchant_id) REFERENCES merchant (id)
    )
    COLLATE='utf8mb4_general_ci';`

    db.query(createproductQuery, function(error, results, fields){
        if (error) throw error;
        console.log('Table product has been Created');
    });