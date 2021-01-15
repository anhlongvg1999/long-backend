    import { sequelize } from '../../connections';
    import BaseModel from './BaseModel';
    import { DataTypes } from 'sequelize';
    import { RolePermission } from './';
    /**
     * Define UserDistributor Model
     * Thong tin tai khoan đăng nhập
     * 
     * @export
     * @class UserDistributor
     * @extends {BaseModel}
     */
    export default class Roles extends BaseModel {

        static association() {
            Roles.hasMany(RolePermission, {as: 'permission', foreignKey: 'role_id', hooks: true, onDelete: 'CASCADE', onUpdate : 'NO ACTION'});
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
        name: {
            type: DataTypes.STRING(255),
            allowNull: true,
            defaultValue: null
        },
        description: {
            type: DataTypes.STRING(255),
            allowNull: true,
            defaultValue: null
        },
        del: {
            type: DataTypes.STRING(255),
            allowNull: true,
            defaultValue: null
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
    const options = {
        tableName: 'roles'
    };

    /**
     * Init Model
     */
    Roles.init(attributes, { ...options, sequelize });