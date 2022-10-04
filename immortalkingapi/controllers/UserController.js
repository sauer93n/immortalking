const UserService = require('../services/user-service');


class UserController{
    setSession(res, data){
        res.cookie('refreshToken', session.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000});
        res.json(session);
    }

    async register(req, res, next){
        const {email, password} = req.body;

        await UserService.register(email, password)
            .then(data => {
                this.setSession(res, data);
            })
            .catch(e => {
                res.status(404).json(e);
            });
    }

    async login(req, res, next){
        const {email, password} = req.body;

        await UserService.login(email, password)
            .then(data => {
                this.setSession(res, data);
            })
            .catch(e => {
                res.status(404).json(e);
            });
    }

    async logout(req, res, next){

    }

    async refresh(req, res, next){
        const {refreshToken} = req.cookies;


    }
}


module.exports = new UserController();