import { MidUser } from "../models/middle";
import { isEmpty } from "lodash";
import logger from '../libs/logger'
class AuthController {
    login(req,res){
        if(isEmpty(req.body)){
            logger.log('Input data login is null!', 'AuthController', 'controllers', 'error', 'AuthController/login');
        }
        return MidUser.loginUser(req.body);
    }

    loginAdmin(req,res){
        if(isEmpty(req.body)){
            logger.log('Input data login is null!', 'AuthController', 'controllers', 'error', 'AuthController/loginAdmin');
        }
        return MidUser.loginAdmin(req.body);
    }

    loginSocial(req,res){
        if(isEmpty(req.body)){
            logger.log('Input data login social is null!', 'AuthController', 'controllers', 'error', 'AuthController/loginSocial');
        }
        return MidUser.loginSocial(req.body);
    }

    register(req,res){
        if(isEmpty(req.body)){
            logger.log('Input data register is null!', 'AuthController', 'controllers', 'error', 'AuthController/register');
        }
        return MidUser.userRegister(req.body);
    }

}
export default new AuthController();