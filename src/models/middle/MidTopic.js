import { Op } from 'sequelize';
import { ERROR_MESSAGE } from "../../config/error";
import { QuestionTopic, Topic } from "../core";
import { MidPaper, MidLevel } from "../middle";
import { isEmpty } from "lodash";
import logger from '../../libs/logger'

class MidTopic {
    async getTopicById(id) {
        return await Topic.findOne({
            where: {
                id
            }
        })
    }
    async getTopicByName(name) {
        return await Topic.findOne({
            where: {
                name
            }
        })
    }
    async createTopic(data) {
        if (!data.name) {
            throw new Error(ERROR_MESSAGE.CREATE_ORDER_RETAIL);
        }
        let TopicName = data.name.trim();
        let checkExizt = await Topic.findOne({
            where: {
                name: TopicName,
                del: 0
            }
        })
        if (checkExizt) {
            throw new Error(ERROR_MESSAGE.REMOVE_ROLE.ERR_USING);
        }
        let dataCreate = {
            name: data.name,
            description: data.description,
            del: 0
        }
        logger.log('Create Topic function run successfully with Topic`s id: ' + dataCreate.id, 'MidTopic', 'models', 'info', 'MidTopic/createTopic');
        return Topic.create(dataCreate);
    }

    async updateTopic(data) {
        let topicName = data.name.trim();
        let objUpdate;
        if (!data.id) {
            throw new Error(ERROR_MESSAGE.ACTIVE_DISTRIBUTOR.ERR_NOTFOUND);
        }
        if (!data.name) {
            throw new Error(ERROR_MESSAGE.CREATE_ORDER_RETAIL);
        }
        let checkExizt = await Topic.findOne({
            where: {
                name: topicName,
                del: 0
            }
        })
        if (checkExizt && checkExizt.id != data.id) {
            throw new Error(ERROR_MESSAGE.REMOVE_ROLE.ERR_USING);
        }
        objUpdate = await Topic.findOne({
            where: {
                id: data.id
            }
        });

        let dataUpdate = {
            name: data.name.trim(),
            description: data.description,
        };
        logger.log('Update Topic function run successfully with Topic`s id: ' + data.id, 'MidTopic', 'models', 'info', 'MidTopic/updateTopic');
        await objUpdate.update(dataUpdate);

    }

    async deleteTopic(data) {
        let objDelete = await Topic.findOne({
            where: {
                id: data.id,
                del: 0
            }
        })

        if (!objDelete) {
            throw new Error(ERROR_MESSAGE.ACTIVE_DISTRIBUTOR.ERR_NOTFOUND);
        }
        let checkExizt = await QuestionTopic.findOne({
            where: {
                topic_id: data.id,
                del: 0
            }
        })
        if (checkExizt) {
            throw new Error(ERROR_MESSAGE.REMOVE_ROLE.ERR_USING);
        }

        let dataDelete = {
            del: 1
        }
        logger.log('Delete Topic function run successfully with Topic`s id: ' + data.id, 'MidTopic', 'models', 'info', 'MidTopic/deleteTopic');
        await objDelete.update(dataDelete);
    }

    async getAllTopic(data) {
        let condition = {
            del: 0
        }
        const [ListTopic, total] = await Promise.all([
            Topic.findAll({
                where: condition,
                order: [["id", "ASC"]]

            }),
            Topic.count({
                where: condition
            })
        ])
        let dataTopicMap = [];
        ListTopic.map(x => {
            let test = {}
            test.value = x.id
            test.label = x.name
            dataTopicMap.push(test)
        })
        if (isEmpty(dataTopicMap)) {
            logger.log('Can`t find list all topic!!!', 'MidTopic', 'models', 'error', 'MidTopic/getAllTopic');
        }
        else {
            logger.log('Get all list topic successfully!!!', 'MidTopic', 'models', 'info', 'MidTopic/getAllTopic');
        }
        return {
            dataTopicMap,
            total: total || 0
        }
    }
    async getAllTopicOneSelect() {
        let condition = {
            del: 0
        }
        const [ListTopic, total] = await Promise.all([
            Topic.findAll({
                where: condition,
                order: [["id", "ASC"]]

            }),
            Topic.count({
                where: condition
            })
        ])
        if (isEmpty(ListTopic)) {
            logger.log('Can`t find list all topic!!!', 'MidTopic', 'models', 'error', 'MidTopic/getAllTopicOneSelect');
        }
        else {
            logger.log('Get all list topic successfully!!!', 'MidTopic', 'models', 'info', 'MidTopic/getAllTopicOneSelect');
        }
        return {
            ListTopic,
            total: total || 0
        }
    }
    async getAllTopicMobile() {
        let condition = {
            del: 0
        }
        const [ListCategory, Total] = await Promise.all([
            Topic.findAll({
                where: condition,
                order: [["id", "ASC"]]

            }),
            Topic.count({
                where: condition
            })
        ])
        if (isEmpty(ListCategory)) {
            logger.log('Can`t find list all topic!!!', 'MidTopic', 'models', 'error', 'MidTopic/getAllTopicMobile');
        }
        else {
            logger.log('Get all list topic successfully!!!', 'MidTopic', 'models', 'info', 'MidTopic/getAllTopicMobile');
        }
        return {
            ListCategory,
            total: Total || 0,
            type: 1
        }
    }

    async searchTopic(data) {
        let condition = {
            del: 0
        };
        if (data.name) {
            condition.name = {
                [Op.like]: `%${data.name}%`
            }
        }

        let { page, limit } = data;
        page = page ? parseInt(page) : 1;
        limit = limit ? parseInt(limit) : 10;

        const [ListSearchTopic, total] = await Promise.all([
            Topic.findAll({
                where: condition,
                order: [["name", "ASC"]],
                limit,
                offset: (page - 1) * limit
            }),
            Topic.count({
                where: condition
            })
        ])
        if (isEmpty(ListSearchTopic)) {
            logger.log('Can`t find list topic!!!', 'MidTopic', 'models', 'error', 'MidTopic/searchTopic');
        }
        else {
            logger.log('Search topic function run successfully!!!', 'MidTopic', 'models', 'info', 'MidTopic/searchTopic');
        }
        return {
            ListSearchTopic,
            total: total || 0
        }
    }
    async getAllCategory(Category_Code) {
        let ListCategory;
        switch (Category_Code) {
            case 'TOPIC':
                ListCategory = await this.getAllTopicMobile();
                break;
            case 'LEVEL':
                ListCategory = await MidLevel.getAllLevelMobile();
                break;
            case 'PAPER':
                ListCategory = await MidPaper.getAllPaperMobile()
                break;
        }
        if (isEmpty(ListCategory)) {
            logger.log('Can`t find list category!!!', 'MidTopic', 'models', 'error', 'MidTopic/getAllCategory');
        }
        else {
            logger.log('Get all list category successfully!!!', 'MidTopic', 'models', 'info', 'MidTopic/getAllCategory');
        }
        return ListCategory
    }

}
export default new MidTopic();