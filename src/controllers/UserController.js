import { MidUser } from "../models/middle";
import { uploadMedia } from '../libs/upload';
import { isEmpty } from "lodash";
import logger from '../libs/logger'
class UserController {
    async createUser(req, res) {
        const dataUpload = await uploadMedia(req, res);
        let logo = dataUpload ? req.protocol + '://' + req.get('host') + '/' + dataUpload.filename : '';
        let encodeUIR = encodeURI(logo);
        let data = req.body;
        if (isEmpty(data)) {
            logger.log('Input data create user is null!', 'UserController', 'controllers', 'error', 'UserController/createUser');
        }
        return MidUser.createUser(data, encodeUIR);
    }
    async getUserInfo(req, res) {
        let { userData } = req;
        if (isEmpty(userData)) {
            logger.log('Input data get userInfo is null!', 'UserController', 'controllers', 'error', 'UserController/getUserInfo');
        }
        userData = userData.toJSON();
        if (!userData.id) {
            userData.name = "";
        } else {
            const accountData = await MidUser.getUserByid(userData.id);
            userData.adminData = accountData || "";
        }

        return userData;
    }

    async getUserInfoMobile(req, res) {
        let { userData } = req;
        if (isEmpty(userData)) {
            logger.log('Input data get userInfo is null!', 'UserController', 'controllers', 'error', 'UserController/getUserInfoMobile');
        }
        userData = userData.toJSON();
        if (!userData.id) {
            userData.name = "";
        } else {
            const accountData = await MidUser.getUserByid(userData.id);
        }
        return userData;
    }
    async getAllUser(req, res) {
        let data = req.query;
        if (isEmpty(data)) {
            logger.log('Input data get userInfo is null!', 'UserController', 'controllers', 'error', 'UserController/getAllUser');
        }
        return await MidUser.getAllUser(data);
    }

    async getDayLeftByUserId(req, res) {
        let { id } = req.query;
        if (isEmpty(id)) {
            logger.log('Input data get day left by UserId is null!', 'UserController', 'controllers', 'error', 'UserController/getDayLeftByUserId');
        }
        return await MidUser.getDayLeftByUserId(id);
    }
    async getUserById(req, res) {
        let { id } = req.query;
        if (isEmpty(id)) {
            logger.log('Input data get user by id is null!', 'UserController', 'controllers', 'error', 'UserController/getUserById');
        }
        return await MidUser.getUserAnswerById(id);
    }
    async getUserHistory(req, res) {
        let data = req.query;
        if (isEmpty(data)) {
            logger.log('Input data get user history is null!', 'UserController', 'controllers', 'error', 'UserController/getUserHistory');
        }
        return await MidUser.getUserHistoryById(data);
    }
    async update(req, res) {
        const dataUpload = await uploadMedia(req, res);
        let avatar = dataUpload ? req.protocol + '://' + req.get('host') + '/' + dataUpload.filename : '';
        let encodeUIR = encodeURI(avatar);
        let data = req.body;
        if (isEmpty(data)) {
            logger.log('Input data update user is null!', 'UserController', 'controllers', 'error', 'UserController/update');
        }
        return await MidUser.updateUser(data, encodeUIR);
    }
    async updatePass(req, res) {
        let data = req.body;
        if (isEmpty(data)) {
            logger.log('Input data update password is null!', 'UserController', 'controllers', 'error', 'UserController/updatePass');
        }
        return await MidUser.updatePassword(data);
    }
    async deleteUser(req, res) {
        let data = req.query;
        if (isEmpty(data)) {
            logger.log('Input data delete user is null!', 'UserController', 'controllers', 'error', 'UserController/deleteUser');
        }
        return await MidUser.deleteUser(data);
    }
    async detailUser(req, res) {
        let data = req.query;
        if (isEmpty(data)) {
            logger.log('Input data detail user is null!', 'UserController', 'controllers', 'error', 'UserController/detailUser');
        }
        return await MidUser.getUserAnswerById(data.id);
    }
}
export default new UserController();