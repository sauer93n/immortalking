const mongoose = require('mongoose');

const productSchema = require('../schemas/ProductSchema');
const userSchema = require('../schemas/UserSchema');
const tokenSchema = require('../schemas/AuthTokenSchema');


module.exports = {
    productModel: mongoose.model("Product", productSchema),
    userModel: mongoose.model("User", userSchema),
    tokenModel: mongoose.model("Token", tokenSchema),
}