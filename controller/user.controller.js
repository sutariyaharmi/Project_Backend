const User = require("../model/user.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const UserServices = require("../services/user.services");
const userservices = new UserServices();


exports.registerUser = async (req, res) => {
    try {
        
        const existingUser = await User.findOne({ email: req.body.email, isDelete: false });
        // console.log("hii");
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists.' });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        if (req.file) {
            imagePath = req.file.path.replace(/\\/g, "/");
          }
          const newUser = new User({
            ...req.body,
            password: hashedPassword , 
            ProfileImage : imagePath
        });
        await newUser.save();
        res.status(201).json({
            user: newUser,
            message: 'User registered successfully.'
        });
    } catch (err) {
        console.error('Error registering user:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// get alluser

exports.getAllUser = async(req,res) =>{
    try {
        let users = await User.find({isDelete: false});
        res.status(200).json(users);
    } 
    catch(error) {
        console.log(error);
        res.status(500).json({message:"Internal Server Error"})
    }
}


// login user

exports.loginUser = async ( req , res) => {
    try {
        let user = await User.findOne ({ email: req.body.email , isDelete : false});
        if(!user){
            return res.status(404).json({message:'user not found'});
        }
        let matchpassword = await bcrypt.compare(req.body.password , user.password);
        if(!matchpassword){
            return res.status(400).json({message:'email or password not matched...'});
        }
        let token = await jwt.sign({userId: user.id} , process.env.JWT_SECRET);
        res.status(200).json({message: 'login successfully' , token});
    } catch (err) {
        console.error('Error login user:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

//User profile
exports.userProfile = async (req,res) => {
    try{
        res.status(200).json(req.user);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error.." })
    }
}

//Upadate Profile

exports.updateProfile = async (req,res) => {
    try {
       let user = req.user;
       user = await userservices.Update(user._id,req.body)
       res.status(202).json({user,message:"user update success"});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error.." })
    }
}

// Delete user

exports.deleteUser = async(req,res) => {
    try {
        let user = req.user;
        user = await userservices.Update(
            user._id,
            {isDelete:true},
            {new:true}
        );
        res.status(202).json({user,message:"User Delete Success"})
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error.." })
    }
}

//  change password

exports.changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword, confirmPassword } = req.body;
        const user = await User.findById(req.user._id);
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Current password is incorrect" });
        }
        if (newPassword !== confirmPassword) {
            return res.status(400).json({ message: "New password and confirm password is not match" });
        }
        const newHashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = newHashedPassword;
        user.save();
        res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
