import { Router } from 'express';
import { QuestionController } from '../controllers';
import { Response } from '../libs/handle_response';
import { isAuth } from '../middlewares/auth';
let routerApp = new Router();

routerApp.post('/create',isAuth,Response(QuestionController.createQuestion));
routerApp.post('/update',isAuth,Response(QuestionController.updateQuestion));
routerApp.get('/delete',isAuth,Response(QuestionController.deleteQuestion));
routerApp.get('/getById',isAuth,Response(QuestionController.getQuestionById));
routerApp.get('/search',isAuth,Response(QuestionController.searchQuestion));
routerApp.get('/check-question',isAuth,Response(QuestionController.CheckQuestion));
routerApp.post('/get-question-by-category',isAuth,Response(QuestionController.getByCat));
routerApp.post('/get-question-by-allCategory',isAuth,Response(QuestionController.getByAllCat));
routerApp.post('/get-question-by-timeTest',isAuth,Response(QuestionController.getByTimeTest));
routerApp.post('/get-question-by-Olevel',isAuth,Response(QuestionController.getByOlevel));
export default routerApp;