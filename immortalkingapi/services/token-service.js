const jwt = require('jsonwebtoken');
const config = require('../config/config');
const {tokenModel} = require('../models/models');


class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, config.JWT_ACCESS_SECRET, {'expiresIn': '30m'});
        const refreshToken = jwt.sign(payload, config.JWT_REFRESH_SECRET, {'expiresIn': '30d'});

        return {
            accessToken,
            refreshToken
        };
    }

    async saveToken(userId, refreshToken) {
        const tokenData =  await tokenModel.findOne({user: userId});

        if (tokenData) {
            tokenData.refreshToken = refreshToken;

            return tokenData.save();
        }

        const token = await tokenModel.create({user: userId, refreshToken});

        return token;
    }

    async refresh(paylod, refreshToken) {
        if (jwt.verify(refreshToken, config.JWT_REFRESH_SECRET)) {
            return {
                refreshToken: jwt.sign(paylod, config.JWT_REFRESH_SECRET, {'expiresIn': '30d'}),
                accessToken: jwt.sign(paylod, config.JWT_ACCESS_SECRET, {'expiresIn': '30m'})
            };
        }
        else {
            throw new ApiException()
        }
    }
}

module.exports = new TokenService();