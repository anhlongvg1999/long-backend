import { Router } from 'express';
import { AnswerController } from '../controllers';
import { Response } from '../libs/handle_response';
import { isAuth } from '../middlewares/auth';
let routerApp = new Router();
routerApp.post('/create',isAuth,Response(AnswerController.createAns));
routerApp.post('/check-answer',isAuth, Response(AnswerController.CheckAnswer));
routerApp.post('/update',isAuth, Response(AnswerController.updateAns));
routerApp.get('/quesAndSetting',isAuth, Response(AnswerController.ansAndSetting));
routerApp.get('/getAnswerByUserId',isAuth, Response(AnswerController.getAnswerByUserId));
routerApp.post('/regexCheckAnswer', Response(AnswerController.regexCheckAnswer));



export default routerApp;