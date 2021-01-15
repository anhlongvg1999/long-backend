import { Router } from 'express';
import { RoleCotroller } from '../controllers';
import { isAuth } from '../middlewares/auth';
import { Response } from '../libs/handle_response';

let routerApp = new Router();
routerApp.get('/getallRole',Response(RoleCotroller.getallRole));
routerApp.post('/createRole',Response(RoleCotroller.createRole));
routerApp.post('/updateRole',Response(RoleCotroller.updateRole));
routerApp.get('/deleteRole',Response(RoleCotroller.deleteRole));
routerApp.get('/searchRole',Response(RoleCotroller.searchRole));
routerApp.post('/updateRoleUser',Response(RoleCotroller.updateRoleUser));
routerApp.post('/updateRolePermission',Response(RoleCotroller.updateRolePermission));
routerApp.get('/getOneSelect',Response(RoleCotroller.getOneSelect));

export default routerApp;