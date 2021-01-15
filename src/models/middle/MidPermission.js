import { Permissions, Role, RolePermission, UserDistributor, Distributor, DistributorPermission, UserRole } from '../core';
import { Op } from 'sequelize';
import { ERROR_MESSAGE } from '../../config/error';
import MidUser from './MidUser';

class MidPermission {
    async getAllPermission() {
        return Permissions.findAll();
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