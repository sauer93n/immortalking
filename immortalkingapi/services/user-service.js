const UserDTO = require('../dtos/UserDTO');
const ApiException = require('../exceptions/ApiException');
const tokenService = require('../services/token-service');
const {userModel} = require('../models/models')


class UserService {
    async register(email, password){
        const user = await userModel.findOne({email: email});

        if (!user) {
            const newUser = await userModel.create({email: email, password: password});

            newUser.save();

            const userDto = new UserDTO(newUser);        
            const tokens = tokenService.generateTokens({...userDto});
    
            await tokenService.saveToken(userDto._id, tokens.refreshToken);

            return {
                ...tokens,
                user: userDto,
            }
        }
        else {
            throw new ApiException('User with provided email already exist!');
        }
    }

    async login(email, password){
        const user = await userModel.findOne({email: email});

        if (!user) {
            throw new ApiException('User does not exist');
        }

        const same = await user.comparePasswords(password, (err, same) => {
            if (err) throw new ApiException('Something went wrong, please try again later...');

            return same;
        });

        if (same) {
            const userDto = new UserDTO(user);        
            const tokens = tokenService.generateTokens({...userDto});
    
            await tokenService.saveToken(userDto._id, tokens.refreshToken);

            return {
                ...tokens,
                user: userDto,
            }
        }
        else {
            throw new ApiException('Wrong password');
        }
    }

    async refresh(refreshToken){
        
    }
}


module.exports = new UserService();