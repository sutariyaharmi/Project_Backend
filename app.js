require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const uri = process.env.Mongos_Uri;
const path = require('path');
const port = process.env.PORT

mongoose
.connect(uri)
.then(() => console.log(`Database connection successFully...`))
.catch(err => console.log(err))


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// user routes

const userRoutes = require('./router/user.routes');
app.use('/api/user',userRoutes);

// Product Routes

const productRoutes = require("./router/product.routes");
app.use("/api/product",productRoutes);

// cart Routes

const cartRoutes = require("./router/cart.routes")
app.use("/api/cart",cartRoutes);


//order Routes
const orderRoutes= require('./router/order.routes');
app.use("/api/order",orderRoutes);


//wishlist Routes
const wishlistRoutes=require('./router/wishlist.routes')
app.use("/api/wishlist",wishlistRoutes)

//Review Routes
const reviewRoutes = require('./router/review.routes');
app.use("/api/review", reviewRoutes)

//OTP Routes
const otpRoutes = require('./router/otp.routes');
app.use("/api/otp", otpRoutes);

app.listen(port , () => {
    console.log(`server start http://localhost:1234`);
    
})
