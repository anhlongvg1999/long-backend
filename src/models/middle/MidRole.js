import { Role, UserRole,RolePermission } from '../core'
import { ERROR_MESSAGE } from '../../config/error';
import { Op } from 'sequelize';
import { RoleApi } from 'npm-longttl-12'
class MidRole {
    async getallRole(data) {
        // let condition = {
        //     del: 0,
        // };
        // let { page, limit } = data;
        // page = page ? parseInt(page) : 1;
        // limit = limit ? parseInt(limit) : 25;
        // const [allRole, total] = await Promise.all([
        //     Role.findAll({
        //         where: condition,
        //         order: [["createdAt", "DESC"]],
        //         limit,
        //         offset: (page - 1) * limit

        //     }),
        //     Role.count({
        //         where: condition
        //     })
        // ])

        // return {
        //     rows: allRole,
        //     total: total || 0
        // }
        return await RoleApi.getallRole(data);
    }
    async createRole(data) {
        // if (!data.name || !data.description) {
        //     throw new Error(ERROR_MESSAGE.ORGANIZATION.ERR_REQUIRE_INPUT);
        // }
        // let dataCreate = {
        //     name: data.name,
        //     description: data.description,
        //     del: 0
        // }
        // return await Role.create(dataCreate);
        return await RoleApi.createRole(data);
    }
    async deleteRole(data) {
        // let objDelete = await Role.findOne({
        //     where: {
        //         id: data.id,
        //         del: 0
        //     }
        // })

        // if (!objDelete) {
        //     throw new Error(ERROR_MESSAGE.ORGANIZATION.ERR_SEARCH_NOT_FOUND)
        // };
        // let dataDelete = {
        //     del: 1,
        // }

        // return objDelete.update(dataDelete)
        return await RoleApi.deleteRole(data)
    }
    async updateRole(data) {
        // if (!data.id) {
        //     throw new Error(ERROR_MESSAGE.ORGANIZATION.ERR_SEARCH_NOT_FOUND);
        // }
        // let objUpdate = await Role.findOne({
        //     where: {
        //         id: data.id,
        //         del: 0
        //     }
        // })
        // let dataUpdate = {
        //     name: data.name,
        //     description: data.description,
        // }
        // return objUpdate.update(dataUpdate)
        return await RoleApi.updateRole(data)
    }
    async searchRole(data) {
        // let condition = {
        //     del: 0,
        // };
        // if (data.name) {
        //     condition.name = {
        //         [Op.like]: `%${data.name}%`
        //     }
        // }
        // if (data.description) {
        //     condition.description = {
        //         [Op.like]: `%${data.description}%`
        //     }
        // }

        // let { page, limit } = data;
        // page = page ? parseInt(page) : 1;
        // limit = limit ? parseInt(limit) : 25;

        // const [allRole, total] = await Promise.all([
        //     Role.findAll({
        //         where: condition,
        //         order: [["createdAt", "DESC"]],
        //         limit,
        //         offset: (page - 1) * limit

        //     }),
        //     Role.count({
        //         where: condition
        //     })
        // ])

        // return {
        //     rows: allRole,
        //     total: total || 0
        // }
        return await RoleApi.searchRole(data)
    }
    async updateRoleUser(user_id, listUserRole) {
        // const oldRoleUser = await UserRole.findAll({ where: { userid: user_id } });
        // console.log('1',oldRoleUser)
        // const oldRoleUserIds = oldRoleUser.map(i=>i.userid)
        // oldRoleUser.forEach(it => {
        //     if (!listUserRole.includes(it.userid)) {
        //         it.destroy();
        //     }
        // })
        // let insertNewPermission = [];
        // listUserRole.forEach(it => {
        //     if (!oldRoleUserIds.includes(it)) {
        //         insertNewPermission.push(
        //            UserRole.create({ userid:user_id, role_id: it })
        //         )
        //     }
        // })

        // return listUserRole;
        return await RoleApi.updateRoleUser(user_id,listUserRole)
    }
    async updateRolePermission(role_id, listPermission) {
        const oldPermisison = await RolePermission.findAll({where:{role_id}});
        const oldPermisisonIds = oldPermisison.map(it => it.permission_id);
        oldPermisison.forEach(it => {
            if (!listPermission.includes(it.permission_id)) {
                it.destroy();
            }
        })

        let insertNewPermission = [];
        listPermission.forEach(it => {
            if (!oldPermisisonIds.includes(it)) {
                insertNewPermission.push(
                    RolePermission.create({ role_id:role_id, permission_id: it })
                )
            }
        })

        return insertNewPermission;
    }

}
export default new MidRole();