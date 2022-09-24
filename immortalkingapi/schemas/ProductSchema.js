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

// id: uuid.v4(),
//     picture: "akashi_red.png",
//     type: "t-shirt",
//     desc: "ракузан в обновленном двуцветном дизайне",
//     name: "rakuzan string",
//     bigPicture: "akashi_red_415px.png",
//     printType: "вышитый рисунок",
//     cutType: "оверсайз крой",
//     clothType: "кулирная ткань 95 + 5 плотность 200гр",

// let model = mongoose.model("Product", Product);

module.exports = Product;