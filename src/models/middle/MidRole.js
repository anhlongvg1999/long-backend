import { Role, UserRole, RolePermission, Permissions } from '../core'
import { ERROR_MESSAGE } from '../../config/error';
import { Op, where } from 'sequelize';
import { RoleApi } from 'npm-longttl-123'
class MidRole {
    async getallRole(data) {
        let condition = {
            del: 0,
        };
        let { page, limit } = data;
        page = page ? parseInt(page) : 1;
        limit = limit ? parseInt(limit) : 25;
        let [allRole, total] = await Promise.all([
            Role.findAll({
                where: condition,
                include: ['permission'],
                order: [["createdAt", "DESC"]],
                limit,
                offset: (page - 1) * limit

            }),
            Role.count({
                where: condition
            })
        ])
        let List_Role = []
        for (var i = 0; i < total; i++) {
            let datapush = []
            let list_permission_id = allRole[i].permission.map(x => x.permission_id)
            for (var j = 0; j < list_permission_id.length; j++) {
                if (list_permission_id[j] == null) break;
                var list = {};
                let dataPermissions = await Permissions.findOne({ where: { id: list_permission_id[j] } })
                list.value = list_permission_id[j];
                list.label = dataPermissions.name;
                datapush.push(list)
            }
            List_Role.push({
                id: allRole[i].id,
                name: allRole.name,
                description: allRole[i].description,
                del: allRole[i].del,
                createdAt: allRole[i].createdAt,
                List_Per: datapush
            })
        }
        return {
            rows: List_Role,
            total: total || 0
        }
        //return await RoleApi.getallRole(data);
    }
    async getOneSelect() {
        // let [listAllRole, total] = await Promise.all([
        //     Role.findAll({
        //         order: [["id", "DESC"]],
        //     }),
        //     Role.count({
        //     })

        // ]);
        // let RoleOneSelect = [];

        // listAllRole.map(i => {
        //     var list = {};
        //     list.value = i.id;
        //     list.label = i.name;
        //     RoleOneSelect.push(list)
        // })
        // return RoleOneSelect
        return await RoleApi.getOneSelect()
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
        // let create = await Role.create(dataCreate);
        // let listPermission = data.List_Per.map(x => x.value)
        // this.updateRolePermission(create.id, listPermission)
        // return create;
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
        // const existRoleUser = await UserRole.findOne({
        //     where: {
        //         role_id: data.id
        //     }
        // })

        // if (existRoleUser) {
        //     throw new Error(ERROR_MESSAGE.REMOVE_ROLE.ERR_EXIST_USER);
        // }
        // await RolePermission.destroy({ where: { role_id: data.id } })
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
        // let listPermission = data.List_Per.map(x => x.value)
        // this.updateRolePermission(data.id, listPermission)
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
    async getRolebyId(role_id) {
        // let allRole = await Role.findOne({ where: { id: role_id }, include: ['permission'] })
        // let List_Role = []
        // let datapush = []
        // let list_permission_id = allRole.permission.map(x => x.permission_id)
        // for (var j = 0; j < list_permission_id.length; j++) {
        //     if (list_permission_id[j] == null) break;
        //     var list = {};
        //     let dataPermissions = await Permissions.findOne({ where: { id: list_permission_id[j] } })
        //     list.value = list_permission_id[j];
        //     list.label = dataPermissions.name;
        //     datapush.push(list)
        // }
        // List_Role.push({
        //     id: allRole.id,
        //     name: allRole.name,
        //     description: allRole.description,
        //     del: allRole.del,
        //     createdAt: allRole.createdAt,
        //     List_Per: datapush
        // })
        // return {
        //     rows: List_Role
        // }
        return await RoleApi.getRolebyId(role_id)
    }
    async updateRoleUser(user_id, listUserRole) {
        const oldRoleUser = await UserRole.findAll({ where: { userid: user_id } });
        const oldRoleUserIds = oldRoleUser.map(i => i.userid)
        oldRoleUser.forEach(it => {
            if (!listUserRole.includes(it.userid)) {
                it.destroy();
            }
        })
        let insertNewPermission = [];
        listUserRole.forEach(it => {
            if (!oldRoleUserIds.includes(it)) {
                insertNewPermission.push(
                    UserRole.create({ userid: user_id, role_id: it })
                )
            }
        })

        return listUserRole;
        //return await RoleApi.updateRoleUser(user_id, listUserRole)
    }
    async updateRolePermission(role_id, listPermission) {
        const oldPermisison = await RolePermission.findAll({ where: { role_id } });
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
                    RolePermission.create({ role_id: role_id, permission_id: it })
                )
            }
        })

        return listPermission;
    }

}
export default new MidRole();