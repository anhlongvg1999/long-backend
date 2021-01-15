import { Router } from 'express';
import { LevelController } from '../controllers';
import { Response } from '../libs/handle_response';
import { isAuth } from '../middlewares/auth';
let routerApp = new Router();

routerApp.post('/create',isAuth,Response(LevelController.createLevel));
routerApp.post('/update',isAuth,Response(LevelController.updateLevel));
routerApp.get('/delete',isAuth,Response(LevelController.deleteLevel));
routerApp.get('/getAll',isAuth,Response(LevelController.getAllLevel));
routerApp.get('/getAllOneSelect',isAuth,Response(LevelController.getAllLevelOne));
routerApp.get('/getById',isAuth,Response(LevelController.getLevelById));
routerApp.get('/search',isAuth,Response(LevelController.searchLevel));
export default routerApp;