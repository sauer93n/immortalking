const mongoose = require('mongoose');

const productSchema = require('../schemas/ProductSchema');
const userSchema = require('../schemas/UserSchema');


module.exports = {
    productModel: mongoose.model("Product", productSchema),
    userModel: mongoose.model("User", userSchema),
}