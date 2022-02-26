const express = require('express');
const productRoute = require('../controller/product.controll');
const productMiddleware = require('../middlewares/product.middle')
const merchantRoute = require('../controller/merchant.controll');
const merchantMiddleware = require('../middlewares/merchant.middle')
const loginRoute = require('../controller/login.controll');
const loginMiddleware = require('../middlewares/login.middle')
const authMiddleware = require('../middlewares/auth.middle');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ massage: 'Welcome' });
});

router.post("/login", loginMiddleware.loginValidation, loginRoute.login);

router.post("/merchant",merchantMiddleware.createValidation,merchantRoute.registerMerchant);
router.put("/merchant",authMiddleware.isAuthenticate,merchantMiddleware.updateValidation,merchantRoute.updateMerchant);
router.delete("/merchant",authMiddleware.isAuthenticate,merchantMiddleware.deleteValidaiton,merchantRoute.deleteMerchant);


router.get("/product",authMiddleware.isAuthenticate,productRoute.getListProduct);
router.post("/product",authMiddleware.isAuthenticate,productMiddleware.productValidation,productRoute.addProduct);
router.put("/product/:id",authMiddleware.isAuthenticate,productMiddleware.productValidation,productRoute.updateProduct);
router.delete("/product/:id",authMiddleware.isAuthenticate,productRoute.deleteProduct);


module.exports = router;
