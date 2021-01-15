import { Router } from 'express';
import { BookMarkController } from '../controllers';
import { Response } from '../libs/handle_response';
import { isAuth } from '../middlewares/auth';
let routerApp = new Router();
routerApp.post('/create',isAuth,Response(BookMarkController.createBookMark));
routerApp.post('/delete',isAuth,Response(BookMarkController.deleteBookMark));
routerApp.get('/getByUserId',isAuth,Response(BookMarkController.getBookMarkByUserId));
export default routerApp;