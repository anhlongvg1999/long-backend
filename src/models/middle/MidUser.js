import { ERROR_MESSAGE } from "../../config/error";
import { checkPassword, hashPassword } from "../../libs/encrypt";
import { generateToken } from "../../libs/token";
import { Answer, User, Question, Setting } from "../core";
import logger from '../../libs/logger'
import { Op } from 'sequelize';
import { MidAnswer, MidQuestion } from ".";
import { isEmpty } from "lodash";
import { text } from "body-parser";
import { sendmailaccount } from '../../libs/sendmailMailGun';
class MidUser {

    async getUserByEmail(email) {
        let user = await User.findOne({
            where: {
                email,
                del: 0,
            }
        })
        if (isEmpty(user)) {
            logger.log('Can`t find user!!', 'MidUser', 'models', 'error', 'MidUser/getUserByEmail');
        }
        return user;
    }
    async getUserBySnsId(snsId) {
        let user = await User.findOne({
            where: {
                snsId,
                del: 0,
                role: 2,
            }
        })
        if (isEmpty(user)) {
            logger.log('Can`t find user!!', 'MidUser', 'models', 'error', 'MidUser/getUserBySnsId');
        }
        return user;
    }

    async getUserByid(id) {
        let user = await User.findOne({
            where: {
                id,
                del: 0,
            }
        })
        if (isEmpty(user)) {
            logger.log('Can`t find user!!', 'MidUser', 'models', 'error', 'MidUser/getUserByid');
        }
        return user;
    }

    async getUserAnswerById(id) {
        let UserById = await User.findOne({

            where: {
                id,
                del: 0,
                role: 2,
            }
        })
        if (isEmpty(UserById)) {
            logger.log('Can`t find user!!', 'MidUser', 'models', 'error', 'MidUser/getUserAnswerById');
        }
        let ans = await MidAnswer.getAnsMostRecent(UserById.id);
        if (isEmpty(ans)) {
            logger.log('Can`t find the most recent answer!!', 'MidUser', 'models', 'error', 'MidUser/getUserAnswerById');
        }    

        let setting = await Setting.findOne({
            where: { del: 0 }
        });
        let date1 = new Date(setting.day_left).getTime();
        let date2 = new Date().getTime();


        let Difference_In_Time = date1 - date2;


        let dayCount = Math.round(Difference_In_Time / (1000 * 3600 * 24));


        let userInfor = {

            id: UserById.id,
            name: UserById.name,
            email: UserById.email,
            password: UserById.password,
            birthday: UserById.birthday,
            avatar: UserById.avatar,
            status: UserById.status,
            del: UserById.del,
            
            ans_update: dayCount,
            creation_Date: UserById.createdAt
        }
        if (isEmpty(userInfor)) {
            logger.log('Can`t find user!!', 'MidUser', 'models', 'error', 'MidUser/getUserAnswerById');
        }
        else {
            logger.log('Successfully find user with user`s id: ' + id, 'MidUser', 'models', 'info', 'MidUser/getUserAnswerById');
        }

        return userInfor;

    }
    async getDayLeftByUserId(id) {
        let UserById = await User.findOne({
            where: {
                id,
                del: 0,
                role: 2,
            }
        })
        if (isEmpty(UserById)) {
            logger.log('Can`t find user!!', 'MidUser', 'models', 'error', 'MidUser/getDayLeftByUserId');
        }
        let dataList = {};
        let ans = await MidAnswer.getAnsMostRecent(UserById.id);
        if (isEmpty(ans)) {
            logger.log('Can`t find the most recent answer!!', 'MidUser', 'models', 'error', 'MidUser/getDayLeftByUserId');
        }
        for (let x = 0; x < ans.length; x++) {
            if (x == 0) {
                dataList = ans[x].updatedAt;
            }
        }
        let date1 = new Date(dataList).getTime();
        let date2 = new Date().getTime();
        let Difference_In_Time = date2 - date1;
        let dayLeft = Math.round(Difference_In_Time / (1000 * 3600 * 24));
        return dayLeft;
    }

    async getUserHistoryById(data) {
        let condition = {
            user_id: data.id,
            del: 0,
        }
        let { page, limit } = data;
        page = page ? parseInt(page) : 1;
        limit = limit ? parseInt(limit) : 10;

        // let dataStart = data.createdAt + 'T00:00:00.000Z';
        // let dataEnd = data.createdAt + 'T23:59:59.000Z';
        // if (data.createdAt) {
        //     condition.createdAt = {
        //         [Op.between]: [dataStart, dataEnd],
        //     }
        // }

        let conditionTitleQuestion = {};
        if (data.title) {
            conditionTitleQuestion.title = {
                [Op.like]: `%${data.title}%`
            }
        }
        let includeQuestionOpt = [
            {
                association: "question",
                required: true,
                where: conditionTitleQuestion
            }
        ];
        let check = data.title && !data.status;
        let total;
        let [answerListOfUser] = await Promise.all([
            Answer.findAll({
                where: condition,
                order: [["id", "DESC"]],
                include: includeQuestionOpt
            })
        ])
        if (isEmpty(answerListOfUser)) {
            logger.log('Can`t find list of answer!!', 'MidUser', 'models', 'error', 'MidUser/getUserHistoryById');
        }
        let userHistory_List = [];
        for (let i = 0; i < answerListOfUser.length; i++) {
            let historyData = {};
            historyData.questionId = answerListOfUser[i].question.id;
            historyData.title = answerListOfUser[i].question.title;
            historyData.status = answerListOfUser[i].is_correct;
            historyData.createdAt = answerListOfUser[i].createdAt;
            userHistory_List.push(historyData);
        }
        if (isEmpty(userHistory_List)) {
            logger.log('Error list of answer!!', 'MidUser', 'models', 'error', 'MidUser/getUserHistoryById');
        }
        if (check) {
            let amout = (page - 1) * limit;
            total = userHistory_List.length;
            userHistory_List = userHistory_List.slice(amout, amout + 10);
        }
        else if (data.status) {
            let amout = (page - 1) * limit;
            total = userHistory_List.length;
            userHistory_List = userHistory_List.filter(x => x.status == data.status);
            total = userHistory_List.length;
            userHistory_List = userHistory_List.slice(amout, amout + 10);

        } else {
            let amout = (page - 1) * limit;
            total = userHistory_List.length;
            userHistory_List = userHistory_List.slice(amout, amout + 10);
        }

        logger.log('GetUserHistoryById function succesfully with user`s id: ' + data.id, 'MidUser', 'models', 'info', 'MidUser/getUserHistoryById');

        return { userHistory_List, total };

    }
    async loginUser(credentials) {
        const { email, password } = credentials;

        if (!email) {
            throw new Error(ERROR_MESSAGE.LOGIN.ERR_REQUIRE_EMAIL);
        }

        if (!password) {
            throw new Error(ERROR_MESSAGE.LOGIN.ERR_REQUIRE_PASSWORD);
        }

        const userData = await this.getUserByEmail(email);

        if (!userData) {
            throw new Error(ERROR_MESSAGE.LOGIN.ERR_ACC);
        }

        const isCorrectPass = await checkPassword(password, userData.password);

        if (!isCorrectPass) {
            throw new Error(ERROR_MESSAGE.LOGIN.ERR_PASS);
        }
        if (parseInt(userData.role) == 1) {
            throw new Error(ERROR_MESSAGE.LOGIN.ERR_STATUS);
        }
        if (parseInt(userData.status) == 2) {
            throw new Error(ERROR_MESSAGE.LOGIN.ERR_DEACTIVE);
        }
        const token = await generateToken({ userid: userData.id, email: email });
        logger.log('Login succesfully with email: ' + email, 'MidUser', 'models', 'info', 'MidUser/loginUser');
        return token;
    }

    async loginAdmin(credentials) {
        const { email, password } = credentials;

        if (!email) {
            throw new Error(ERROR_MESSAGE.LOGIN.ERR_REQUIRE_EMAIL);
        }

        if (!password) {
            throw new Error(ERROR_MESSAGE.LOGIN.ERR_REQUIRE_PASSWORD);
        }

        const userData = await this.getUserByEmail(email);

        if (!userData) {
            throw new Error(ERROR_MESSAGE.LOGIN.ERR_ACC);
        }

        const isCorrectPass = await checkPassword(password, userData.password);

        if (!isCorrectPass) {
            throw new Error(ERROR_MESSAGE.LOGIN.ERR_PASS);
        }
        if (parseInt(userData.role) != 1) {
            throw new Error(ERROR_MESSAGE.LOGIN.ERR_STATUS);
        }
        if (parseInt(userData.status) == 2) {
            throw new Error(ERROR_MESSAGE.LOGIN.ERR_DEACTIVE);
        }
        const token = await generateToken({ userid: userData.id, email: email });
        logger.log('Login succesfully with email: ' + email, 'MidUser', 'models', 'info', 'MidUser/loginUser');
        return token;
    }

    async loginSocial(data) {
        const existSocial = await this.getUserBySnsId(data.snsId);
        if (!existSocial) {
            let dataCreate;
            if (data.name || data.birthday || data.email || data.avatar) {
                dataCreate = {
                    snsId: data.snsId,
                    name: data.name,
                    email: data.email,
                    birthday: data.birthday,
                    avatar: data.avatar,
                    type: 2, //type =2 is login with social 
                    status: 1,
                    role: 2,
                    del: 0,
                }
            }
            else {
                dataCreate = {
                    snsId: data.snsId,
                    type: 2,
                    role: 2,
                    status: 1,
                    del: 0,
                }
            }
            await User.create(dataCreate);
        }
        let dataUser = await this.getUserBySnsId(data.snsId);
        if (parseInt(dataUser.status) == 2) {
            throw new Error(ERROR_MESSAGE.LOGIN.ERR_DEACTIVE);
        }
        const token = await generateToken({ userid: dataUser.id, snsId: dataUser.snsId, email: dataUser.email });
        logger.log('Login succesfully with social: ' + data.snsId, 'MidUser', 'models', 'info', 'MidUser/loginUser');
        return token;
    }

    async createUser(data, logo) {
        if (!data.name) {
            throw new Error(ERROR_MESSAGE.USER.ERR_NAME);
        }
        if (!data.email) {
            throw new Error(ERROR_MESSAGE.USER.ERR_EMAIL);
        }
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(data.email)) {
            throw new Error(ERROR_MESSAGE.USER.INVALID_EMAIL);
        }

        let CheckExist = await User.findOne({
            where: {
                email: data.email,
                del: 0
            }
        })
        if (CheckExist) {
            throw new Error(ERROR_MESSAGE.USER.ERR_EXIST);
        }
        else {
            let dataCreate = {
                name: data.name,
                email: data.email,
                birthday: data.birthday,
                status: data.status, // status = 1 is active
                avatar: logo,
                role: 2,
                type: 1, //type =1 is login with username password
                del: 0,
                password: hashPassword('123456')
            }

            logger.log('Create succesfully new account: ', 'MidUser', 'models', 'info', 'MidUser/createUser');
            // let emailSend = data.email;
            // let textSend = `WELCOME TO EDU ${emailSend}`;
            // let subjectSend = 'Register Successfully!!!';
            // sendmailaccount(textSend,emailSend,subjectSend); 
            await sendmailaccount(data);
            
            return await User.create(dataCreate);
        }
    }

    async userRegister(data) {

        if (!data.name) {
            throw new Error(ERROR_MESSAGE.USER.ERR_NAME);
        }
        if (!data.email) {
            throw new Error(ERROR_MESSAGE.USER.ERR_EMAIL);
        }
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(data.email)) {
            throw new Error(ERROR_MESSAGE.USER.INVALID_EMAIL);
        }
        if (!data.password) {
            throw new Error(ERROR_MESSAGE.USER.ERR_PASSWORD);
        }

        let check = await User.findOne({
            where: {
                email: data.email,
                del: 0
            }
        })
        if (check) {
            throw new Error(ERROR_MESSAGE.USER.ERR_EXIST);
        }
        else {
            let dataCreate = {
                name: data.name,
                email: data.email,
                password: hashPassword(data.password),
                status: 1,
                type: 1,
                role: 2, //type =1 is login with username password
                del: 0,

            }
            logger.log('Register succesfully new account: ', 'MidUser', 'models', 'info', 'MidUser/createUser');
            let userData = await User.create(dataCreate);
            //const { email, password } = credentials;
            let credentials = {};
            credentials.email = data.email;
            credentials.password = data.password;
            let token = await this.loginUser(credentials);
            //const token = await generateToken({ userid: userData.id, email: userData.email });
            return token;
        }
    }
    async getAllUser(data) {

        let condition = {
            del: 0,
            role: 2
        };

        if (data.name) {
            condition.name = {
                [Op.like]: `%${data.name}%`
            }
        }

        if (data.email) {
            condition.email = {
                [Op.like]: `%${data.email}%`
            }
        }
        if (data.status) {
            condition.status = parseInt(data.status);
        }

        // let dataStart = data.createdAt + 'T00:00:00.000Z';
        // let dataEnd = data.createdAt + 'T23:59:59.000Z';
        // if (data.createdAt) {
        //     condition.createdAt = {
        //         [Op.between]: [dataStart, dataEnd],
        //     }

        // }      
        let { page, limit } = data;
        page = page ? parseInt(page) : 1;
        limit = limit ? parseInt(limit) : 10;

        let [listAllUserAndAnswerUpdateAt, total] = await Promise.all([
            User.findAll({
                where: condition,
                order: [["name", "DESC"]],
                limit,
                offset: (page - 1) * limit
            }),
            User.count({
                where: condition
            })

        ]);
        if (isEmpty(listAllUserAndAnswerUpdateAt)) {
            logger.log('Error find user ', 'MidUser', 'models', 'error', 'MidUser/getAllUser');
        }
            
        logger.log('GetAllUser function succesfully!!! ', 'MidUser', 'models', 'info', 'MidUser/getAllUser');
        return { listAllUserAndAnswerUpdateAt, total };

    }


    async deleteUser(data) {
        let objDelete = await User.findOne({
            where: {
                id: data.id,
                del: 0
            }
        })
        if (isEmpty(objDelete)) {
            logger.log('Error find user ', 'MidUser', 'models', 'error', 'MidUser/deleteUser');
        }
        if (!objDelete) {
            throw new Error(ERROR_MESSAGE.ACTIVE_DISTRIBUTOR.ERR_NOTFOUND);
        };

        let dataDelete = {
            del: 1,
        }
        objDelete.update(dataDelete)
    }


    async updateUser(data, avatar) {
        if (!data.id) {
            throw new Error(ERROR_MESSAGE.ACTIVE_DISTRIBUTOR.ERR_NOTFOUND);
        }
        let objUpdate = await User.findOne({
            where: {
                id: data.id
            }
        })
        if (avatar == "") {
            avatar = data.avatar;
        }
        if (isEmpty(objUpdate)) {
            logger.log('Error find user ', 'MidUser', 'models', 'error', 'MidUser/updateUser');
        }
        let dataUpdate = {
            name: data.name,
            email: data.email,
            birthday: data.birthday,
            status: data.status,
            avatar: avatar,
            password: data.password,
        };
        return await objUpdate.update(dataUpdate);

    }
    async updatePassword(data) {


        if (!data.newPassword) {
            throw new Error(ERROR_MESSAGE.USER.ERR_PASS);
        }
        if (!data.oldPassword) {
            throw new Error(ERROR_MESSAGE.USER.ERR_PASS);
        }
        let userId = await User.findOne({
            where: {
                id: data.id,
            }
        })
        if (isEmpty(userId)) {
            logger.log('Error find user ', 'MidUser', 'models', 'error', 'MidUser/updatePassword');
        }
        if (!userId) {
            throw new Error(ERROR_MESSAGE.USER.ERR_NOT_EXIST);
        }


        let isCorrect = await checkPassword(data.oldPassword, userId.password)
        if (isEmpty(!isCorrect)) {
            logger.log('Error Check password ', 'MidUser', 'models', 'error', 'MidUser/updatePassword');
        }
        if (!isCorrect) {
            throw new Error(ERROR_MESSAGE.USER.ERR_CHECK_PASS);
        }
        else {

            let dataUpdate = {
                password: data.newPassword,
            };

            return await userId.update(dataUpdate);
        }
    }

}
export default new MidUser();