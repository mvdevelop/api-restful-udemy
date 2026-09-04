import { Sequelize, Model, DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  public id!: number;
  public nome!: string;
  public email!: string;
  public password_hash!: string;
  public password!: string;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;

  static init(sequelize: Sequelize): typeof User {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        nome: {
          type: DataTypes.STRING,
          defaultValue: '',
          validate: {
            len: [3, 255],
          },
        },
        email: {
          type: DataTypes.STRING,
          defaultValue: '',
          unique: true,
          validate: {
            isEmail: true,
          },
        },
        password_hash: {
          type: DataTypes.STRING,
          defaultValue: '',
        },
        password: {
          type: DataTypes.VIRTUAL,
          defaultValue: '',
          validate: {
            len: [6, 50],
          },
        },
      },
      {
        sequelize,
        tableName: 'users',
      },
    );

    this.addHook('beforeSave', async (user: User) => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  async passwordIsValid(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;