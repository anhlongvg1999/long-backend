import { Router } from 'express';
import { TestMeController } from '../controllers';
import { Response } from '../libs/handle_response';
import { isAuth } from '../middlewares/auth';
let routerApp = new Router();

routerApp.post('/create',isAuth,Response(TestMeController.createTestMe));
routerApp.post('/update',isAuth,Response(TestMeController.updateTestMe));
routerApp.get('/delete',isAuth,Response(TestMeController.deleteTestMe));
routerApp.get('/getAll',isAuth,Response(TestMeController.getAllTestMe));
routerApp.get('/getById',isAuth,Response(TestMeController.getTestMeById));
routerApp.get('/search',isAuth,Response(TestMeController.searchTestMe));

export default routerApp;