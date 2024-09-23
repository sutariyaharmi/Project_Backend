const express = require("express");

const orderRoutes = express.Router();


const {verifyToken, verifyTOken} = require("../helpers/tokenVerify");

orderRoutes.post("/addOrder" , verifyTOken , addNewOrder);
orderRoutes.delete("/" , verifyTOken , deleteOrder);


module.exports = orderRoutes;