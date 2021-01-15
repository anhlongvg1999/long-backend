export {default as User} from './User';
export {default as Role} from './Role';
export {default as Permissions} from './Permissions';
export {default as UserRole} from './UserRole';

export {default as RolePermission} from './RolePermission';


import { sequelize } from '../../connections';

for (let m in sequelize.models) {
    sequelize.models[m].sync();
}

// Init association
for (let m in sequelize.models) {
    sequelize.models[m].association();
}