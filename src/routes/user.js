import { Router } from 'express';
import { UserController } from '../controllers';
import { isAuth } from '../middlewares/auth';
import { Response } from '../libs/handle_response';

let routerApp = new Router();

routerApp.post('/create',Response(UserController.createUser));
routerApp.get('/getById',Response(UserController.getUserById));
routerApp.get('/getAll',Response(UserController.getAllUser));
routerApp.post('/update',Response(UserController.update));
routerApp.post('/updatePass',isAuth,Response(UserController.updatePass));
routerApp.get('/delete',isAuth,Response(UserController.deleteUser));
routerApp.get('/userInfo',isAuth,Response(UserController.getUserInfo));
routerApp.get('/userInfoMobile',isAuth,Response(UserController.getUserInfoMobile));
routerApp.get('/userDetail',isAuth,Response(UserController.detailUser));
routerApp.get('/getDayLeft',isAuth,Response(UserController.getDayLeftByUserId));
routerApp.get('/getUserHistory',isAuth,Response(UserController.getUserHistory));
routerApp.get('/getArrayPermissionOfUser',Response(UserController.getArrayPermissionOfUser));

export default routerApp;