import { Router } from 'express';
import auth from './auth';
import user from './user';
import role from "./role";
import permission from "./permission";
let routerApp = new Router();

routerApp.use('/auth', auth);
routerApp.use('/user',user);
routerApp.use('/role',role);
routerApp.use('/permission',permission);

export default routerApp;