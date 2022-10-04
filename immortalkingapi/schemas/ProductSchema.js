const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const Product = new Schema({
    id: Schema.Types.ObjectId,
    type: String,
    picture: String,
    desc: String,
    name: String,
    bigPicture: String,
    printType: String,
    cutType: String,
    clothType: String,
    price: Number,
    sizes: Object,
});

module.exports = Product;