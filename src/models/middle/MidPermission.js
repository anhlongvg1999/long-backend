import { Permissions, Role, RolePermission, UserDistributor, Distributor, DistributorPermission, UserRole } from '../core';
import { Op } from 'sequelize';
import { ERROR_MESSAGE } from '../../config/error';
import MidUser from './MidUser';

class MidPermission {
    async getAllPermission() {
        let [listAllPer, total] = await Promise.all([
            Permissions.findAll({
                order: [["id", "DESC"]],
            }),
            Permissions.count({
            })

        ]);
        let PerOneSelect=[];
        
        listAllPer.map(i=> {
            var list ={};
            list.value = i.id;
            list.label = i.name;
            PerOneSelect.push(list)
        })
        
        return PerOneSelect;
    }
    getRolePermission(id) {
        return Role.findOne({
            where: {
                id
            },
            include: ['permission']
        })
    }

}

export default new MidPermission();