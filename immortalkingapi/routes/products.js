var express = require('express');
var router = express.Router();
var uuid = require('uuid');

const {productModel} = require('../models/models');
const {ObjectId} = require('mongodb');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.set({
        'Content-Type': 'application/json',
    })

    productModel.find((err, docs) => {
        if (err){
            res.send("АШЫБКА");
        }
        else{
            res.json(docs);
        }
    });
});

router.get('/:id', function(req, res, next) {
    res.set({
        'Content-Type': 'application/json',
    })

    productModel.findOne({"_id": ObjectId(req.params.id)}, (err, doc) => {
        if (err){
            res.send("АШЫБКА");
        }
        else{
            res.json(doc);
        }
    });
});

router.put('/:id', function(req, res, next) {
    res.set({
        'Content-Type': 'application/json',
    })

    // console.log(req.body)

    productModel.findById(ObjectId(req.params.id)).exec((doc, err) => {
        console.log(doc)
    })


    productModel.findOneAndUpdate({_id: ObjectId(req.params.id)}, req.body, (err, doc) => {
        console.log(err);

        if (err){
            res.send("АШЫБКА");
        }
        else{
            res.json(doc);

        }
    });
});

router.post('/', function(req, res) {
    let data = JSON.parse(req.files.json.data);
    let pic = req.files.picture;
    let bigPic = req.files.bigPicture;

    pic.mv('./images/' + pic.name);
    bigPic.mv('./images/' + bigPic.name);

    let doc = {
        picture: pic.name,
        type: data.type,
        desc: data.desc,
        name: data.name,
        bigPicture: bigPic.name,
        printType: data.printType,
        cutType: data.cutType,
        clothType: data.clothType,
        price: data.price,
        sizes: data.sizes,
    }

    productModel.create(doc);

    console.log(data.ProductType);

    res.json({
        status: "success",
    });
})

router.delete('/:id', function(req, res) {
    console.log(req.params.id);

    console.log(ObjectId(req.params.id));

    productModel.deleteOne({"_id": ObjectId(req.params.id)}).exec(function(e, product) {
        if (e){
            res.send("Произошла ошибка");
        }
        else{
            res.send("Товар удален");
        }
    });
})

module.exports = router;
