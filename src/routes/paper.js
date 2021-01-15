import { Router } from 'express';
import { PaperController } from '../controllers';
import { Response } from '../libs/handle_response';
import { isAuth } from '../middlewares/auth';
let routerApp = new Router();

routerApp.post('/create',isAuth,Response(PaperController.createPaper));
routerApp.post('/update',isAuth,Response(PaperController.updatePaper));
routerApp.get('/delete',isAuth,Response(PaperController.deletePaper));
routerApp.get('/getAll',isAuth,Response(PaperController.getAllPaper));
routerApp.get('/getAllOneSelect',isAuth,Response(PaperController.getAllPaperOne));
routerApp.get('/getById',isAuth,Response(PaperController.getPaperById));
routerApp.get('/search',isAuth,Response(PaperController.searchPaper));


export default routerApp;