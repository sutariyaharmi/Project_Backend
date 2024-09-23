const express = require('express');
const userRoutes = express.Router();
const { registerUser, loginUser, getAllUser, updateProfile, userProfile, deleteUser, changePassword, } = require('../controller/user.controller');
const { verifyTOken} = require('../helpers/tokenverify');
const {upload} = require("../helpers/userimages");

userRoutes.post("/register", upload.single('ProfileImage'), registerUser);
userRoutes.get("/Alluser" , getAllUser);
userRoutes.post('/login' , loginUser);
userRoutes.put("/update" , verifyTOken , updateProfile);
userRoutes.get("/useprofile" ,verifyTOken, userProfile);
userRoutes.delete("/delete" ,verifyTOken, deleteUser);
userRoutes.put("/change-password",verifyTOken, changePassword);

module.exports = userRoutes; 