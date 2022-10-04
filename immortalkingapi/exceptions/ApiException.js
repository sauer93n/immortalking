module.exports = class ApiException {
    error;

    constructor(error){
        this.error = error;
    }

    toString(){
        return this.error;
    }
}