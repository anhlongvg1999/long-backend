import { Router } from 'express';
import { AuthController } from '../controllers';
import { Response } from '../libs/handle_response';
import { isAuth } from '../middlewares/auth';

let routerApp = new Router();
routerApp.post('/login', Response(AuthController.loginAdmin));
routerApp.post('/login_user', Response(AuthController.login));
routerApp.post('/register', Response(AuthController.register));
routerApp.post('/loginSocial', Response(AuthController.loginSocial));
routerApp.post('/forgotPassword', Response(AuthController.forgotPassword));
routerApp.post('/confirmForgotPassword', Response(AuthController.verifyForgot));

export default routerApp;