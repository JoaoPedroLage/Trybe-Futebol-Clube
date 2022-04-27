import { Model, INTEGER, TEXT } from 'sequelize';
import db from '.';

class Users extends Model {
  public id!: number;

  public userName!: string;

  public role!: string;

  public email!: string;

  public password!: string;
}

Users.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  userName: {
    type: TEXT,
    allowNull: false,
  },
  role: {
    type: TEXT,
    allowNull: false,
  },
  email: {
    type: TEXT,
    allowNull: false,
  },
  password: {
    type: TEXT,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'Users',
  timestamps: false,
});

export default Users;
