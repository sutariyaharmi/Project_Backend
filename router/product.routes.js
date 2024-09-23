const express = require('express');
const { addNewProduct , getAllProduct , updateProduct , deleteProduct } = require('../controller/product.controller');
const productRoutes = express.Router();
const {verifyTOken}= require('../helpers/tokenverify')

productRoutes.post("/add",addNewProduct);
productRoutes.get("/getall",getAllProduct);
productRoutes.put("/update",verifyTOken,updateProduct);
productRoutes.delete("/delete",deleteProduct);

module.exports = productRoutes;