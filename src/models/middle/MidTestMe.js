import { ERROR_MESSAGE } from "../../config/error";
import { TestMe } from "../core";
import { Op } from 'sequelize';
import { isEmpty } from "lodash";
import logger from '../../libs/logger'
class MidTestMe {

    async getTestMeById(id) {
        let testMe = await TestMe.findOne({
            where: {
                id
            }
        })
        if (isEmpty(testMe)) {
            logger.log('Error find  test me!!', 'MidTestMe', 'models', 'error', 'MidTestMe/getTestMeById');
        }
        return testMe;
    }

    async getTestMeByName(name) {
        let testMe = await TestMe.findOne({
            where: {
                name
            }
        })
        if (isEmpty(testMe)) {
            logger.log('Error find test me by name!!', 'MidTestMe', 'models', 'error', 'MidTestMe/getTestMeByName');
        }
        return testMe;
    }
    async createTestMe(data, logo) {
        if (!data.name) {
            throw new Error(ERROR_MESSAGE.CREATE_ORDER_RETAIL);
        }
        let dataCreate = {
            name: data.name,
            description: data.description,
            time_type: data.time_type,
            is_multi_topic: data.is_multi_topic,
            is_multi_paper: data.is_multi_paper,
            is_multi_level: data.is_multi_level,
            is_multi_year: data.is_multi_year,
            logo: logo,
            index: data.index,
            del: 0,
        }

        logger.log('Create test me successfully!!', 'MidTestMe', 'models', 'info', 'MidTestMe/createTestMe');

        return TestMe.create(dataCreate);
    }

    async updateTestMe(data, logo) {
        if (!data.id) {
            throw new Error(ERROR_MESSAGE.ACTIVE_DISTRIBUTOR.ERR_NOTFOUND);
        }
        if (!data.name) {
            throw new Error(ERROR_MESSAGE.CREATE_ORDER_RETAIL);
        }
        if (logo == "") {
            logo = data.logo;
        }
        let objUpdate = await TestMe.findOne({
            where: {
                id: data.id
            }
        })
        if (isEmpty(objUpdate)) {
            logger.log('Error find test me !!', 'MidTestMe', 'models', 'error', 'MidTestMe/updateTestMe');
        }
        let dataUpdate = {
            name: data.name,
            description: data.description,
            logo: logo,
            time_type: data.time_type,
            is_multi_topic: data.is_multi_topic,
            is_multi_paper: data.is_multi_paper,
            is_multi_level: data.is_multi_level,
            is_multi_year: data.is_multi_year,
            active: data.active,
            logo: logo,
            index: data.index
        };
        logger.log('Create test me successfully!!', 'MidTestMe', 'models', 'info', 'MidTestMe/updateTestMe');
        return await objUpdate.update(dataUpdate);

    }

    async deleteTestMe(data) {
        let objDelete = await TestMe.findOne({
            where: {
                id: data.id,
                del: 0
            }
        })
        if (isEmpty(objDelete)) {
            logger.log('Error find test me !!', 'MidTestMe', 'models', 'error', 'MidTestMe/deleteTestMe');
        }
        if (!objDelete) {
            throw new Error(ERROR_MESSAGE.ACTIVE_DISTRIBUTOR.ERR_NOTFOUND);
        };

        let dataDelete = {
            del: 1,
        }
        logger.log('Delete test me successfully!!', 'MidTestMe', 'models', 'info', 'MidTestMe/deleteTestMe');
        return await objDelete.update(dataDelete)
    }
    async getAllTestMe(data) {
        let condition = {
            active: 1,
            del: 0
        }
        const [ListTestMe, total] = await Promise.all([
            TestMe.findAll({
                where: condition,
                order: [["index", "ASC"]]
            }),
            TestMe.count({
                where: condition
            })
        ])
        if (isEmpty(ListTestMe)) {
            logger.log('Error find test me !!', 'MidTestMe', 'models', 'error', 'MidTestMe/getAllTestMe');
        }
        else {
            logger.log('get All test me successfully!!', 'MidTestMe', 'models', 'info', 'MidTestMe/getAllTestMe');
        }
        return {
            ListTestMe,
            total: total || 0
        }

    }

    async searchTestMe(data) {
        let condition = {
            del: 0
        }
        if (data.name) {
            condition.name = {
                [Op.like]: `%${data.name}%`
            }
        }
        let { page, limit } = data;
        page = page ? parseInt(page) : 1;
        limit = limit ? parseInt(limit) : 10;

        const [ListSearchTestMe, total] = await Promise.all([
            TestMe.findAll({
                where: condition,
                order: [["index", "ASC"]],
                limit,
                offset: (page - 1) * limit
            }),
            TestMe.count({
                where: condition
            })
        ])
        if (isEmpty(ListSearchTestMe)) {
            logger.log('Error find test me !!', 'MidTestMe', 'models', 'error', 'MidTestMe/searchTestMe');
        }
        else {
            logger.log('Search test me successfully!!', 'MidTestMe', 'models', 'info', 'MidTestMe/searchTestMe');
        }
        return {
            ListSearchTestMe,
            total: total || 0
        }

    }


}
export default new MidTestMe();