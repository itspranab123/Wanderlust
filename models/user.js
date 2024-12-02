const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchma = new Schema({
    email: {
        type: String,
        require: true,
    },
    //username automatically created by using "passport-local-mongoose";
})

userSchma.plugin(passportLocalMongoose);     // it is use for create username,hashing,and also salting bydefault.
module.exports = mongoose.model('User', userSchma);

