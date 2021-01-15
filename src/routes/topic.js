import { Router } from 'express';
import { TopicController } from '../controllers';
import { Response } from '../libs/handle_response';
import { isAuth } from '../middlewares/auth';
let routerApp = new Router();

routerApp.post('/create',isAuth,Response(TopicController.createTopic));
routerApp.post('/update',isAuth,Response(TopicController.updateTopic));
routerApp.get('/delete',isAuth,Response(TopicController.deleteTopic));
routerApp.get('/getAll',isAuth,Response(TopicController.getAllTopic));
routerApp.get('/getAllOneSelect',isAuth,Response(TopicController.getAllTopicOne));
routerApp.get('/getById',isAuth,Response(TopicController.getTopicById));
routerApp.get('/search',isAuth,Response(TopicController.searchTopic));
routerApp.get('/get-all-category',isAuth,Response(TopicController.getAllCategory));

export default routerApp;