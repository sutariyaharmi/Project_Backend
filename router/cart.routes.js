const express = require("express");
const cartRoutes = express.Router();

const {verifyToken, verifyTOken} = require('../helpers/tokenVerify');
const { addtoCart, getAllCart, updateCart, deleteCart } = require("../controller/cart.controller");

cartRoutes.post("/addcart",verifyTOken,addtoCart);
cartRoutes.get("/getcart",verifyTOken,getAllCart);
cartRoutes.post("/updatecart",verifyTOken,updateCart);
cartRoutes.delete("/delete" ,verifyTOken ,deleteCart);

module.exports = cartRoutes;