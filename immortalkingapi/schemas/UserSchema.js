const { Schema } = require("mongoose");
const bcrypt = require('bcrypt');

const User = new Schema({
    id: Schema.Types.ObjectId,
    email: String,
    password: String,
});


User.pre('save', function(next){
    let user = this;

    if (!user.isModified('password')) return next();

    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);


        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err);

            user.password = hash;

            next();
        })
    })
})

User.methods.comparePasswords = function(password) {
    return bcrypt.compare(password, this.password);
}

module.exports = User;