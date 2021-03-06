
import { DataTypes } from 'sequelize';
import { sequelize } from '../../connections';
import BaseModel from './BaseModel';
import { User } from ".";

/**
 * Define UserRole Model
 * luu nhom quyen cua user
 * 
 * @export
 * @class UserRole
 * @extends {BaseModel}
 */
export default class UserRole extends BaseModel {

    static association() {
        UserRole.belongsTo(User, { as: 'user', foreignKey: 'userid' });
    }
}

/**
 * Attributes model
 */
const attributes = {
    id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    userid: {
        type: DataTypes.UUID,
        allowNull: true,
        defaultValue: 0
    },
    role_id: {
        type: DataTypes.INTEGER(10),
        allowNull: true,
        defaultValue: 0
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: true
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: true
    }
};

/**
 * Options model
 */
function beforeCreate(){
    UserRole.beforeCreate((obj,_) => {
        return obj.id = uuidv4();
    });
}
const options = {
    tableName: 'user_role',
    hooks: {
        beforeCreate: beforeCreate
    }
};

/**
 * Init Model
 */
UserRole.init(attributes, { ...options, sequelize });