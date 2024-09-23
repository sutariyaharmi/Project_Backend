const jwt = require('jsonwebtoken');
const User = require("../model/user.model");

exports.verifyTOken = async (req , res , next) =>{
    try {
        let authorization = req.headers['authorization'];
        if(!authorization){
            return res.json({Message : 'Not Authorized'});
        }
        let token = authorization.split(" ")[1];
        let payload = await jwt.verify(token , process.env.JWT_SECRET);
        if(!payload){
            return res.status(401).json({message : 'Unauthorized'});
        }
        let user = await User.findOne({_id:payload.userId , isDelete:false});
        if(!user){
            return res.status(404).json({message : 'User not Found'});
        }
        req.user = user;
        next();
    } catch (err) {
        console.log(err);
        res.status(500).json({Message : 'Server Error'});   
    }
}