import { Router } from 'express';
import { PermissionController } from '../controllers';
import { Response } from '../libs/handle_response';
import { isAuth } from '../middlewares/auth';

let routerApp = new Router();
routerApp.get('/getAllPermission',Response(PermissionController.getAllPermission));
routerApp.get('/getRolePermission',Response(PermissionController.getRolePermission));

export default routerApp;