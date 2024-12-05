/* 
    This file defines and initializes the UserModel class using Sequelize, which simplifies 
    our project's database interactions. It maps the structure of the database's users table and configures 
    TypeScript types to ensure type safety.
*/

import { User } from '@/interfaces/user.interfaces';
import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

// Definition of Creation Attributes
export type UserCreationAttributes = Optional<User, 'id' | 'username'>;

/* 
    UserCreationAttributes: This type ensures that id, username are optional 
    when creating a new user because these field will be generated automatically 
    when creating a new user by signing up.
*/

// Defining the user model class
export class UserModel
    extends Model<User, UserCreationAttributes>
    implements User
{
    public id!: string;
    public email!: string;
    public name!: string;
    public username!: string;
    public password!: string;
    public created_at: string | undefined;
    public updated_at: string | undefined;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

// Model Initialization
export default function (sequelize: Sequelize): typeof UserModel {
    UserModel.init(
        {
            // id: Primary key, auto-generated using UUIDV4.
            id: {
                primaryKey: true,
                type: DataTypes.UUIDV4,
                defaultValue: DataTypes.UUIDV4,
            },
            email: {
                allowNull: false,
                type: DataTypes.STRING,
                unique: true,
            },
            name: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            username: {
                allowNull: true,
                type: DataTypes.STRING,
                unique: true,
            },
            // password: Required, with a maximum length of 255 characters.
            password: {
                allowNull: false,
                type: DataTypes.STRING(255),
            },
            created_at: DataTypes.DATE,
            updated_at: DataTypes.DATE,
        },
        // Model Options:
        {
            tableName: 'users',
            sequelize,
            // createdAt: ‘created_at’ / updatedAt: ‘updated_at’: Maps Sequelize’s automatic timestamp fields to custom column names.
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            // imestamps: true: Ensures Sequelize automatically manages created_at and updated_at.
            timestamps: true,
        },
    );

    return UserModel;
}
