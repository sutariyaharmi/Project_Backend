const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    Firstname: String,
    lastname:{
        type:String
    },
    email : {
        type:String,
        required : true,
    },
    password:{
        type:String,
        required : true
    },
    role:{
        type:String,
        enum:['admin','user'],
        default:'user'
    },
    ProfileImage:{
           type : String
    },
    isDelete:{
        type:Boolean,
        default:false
    },

},
{
    versionKey : false,
    timestamps: true
});

module.exports = mongoose.model('users' , userSchema)