import { Router } from 'express';
import { SettingController } from '../controllers';
import { Response } from '../libs/handle_response';
import { isAuth } from '../middlewares/auth';
let routerApp = new Router();

routerApp.post('/update-setting',isAuth,Response(SettingController.updateSetting));
routerApp.get('/get-setting',isAuth,Response(SettingController.getSetting));
routerApp.get('/get-daysleft',isAuth,Response(SettingController.getDaysLeftBySetting));

export default routerApp;