module.exports = class UserDTO {
    _id;
    email;
    
    constructor(model){
        this._id = model._id;
        this.email = model.email;
    }
}