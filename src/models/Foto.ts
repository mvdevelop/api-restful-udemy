import { Sequelize, Model, DataTypes } from 'sequelize';

class Foto extends Model {
  public id!: number;
  public originalname!: string;
  public filename!: string;
  public aluno_id!: number;
  public readonly url!: string;

  static init(sequelize: Sequelize): typeof Foto {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        originalname: {
          type: DataTypes.STRING,
          defaultValue: '',
        },
        filename: {
          type: DataTypes.STRING,
          defaultValue: '',
        },
        aluno_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        url: {
          type: DataTypes.VIRTUAL,
          get(): string {
            return `${process.env.APP_URL || 'http://localhost:3001'}/images/${this.getDataValue('filename')}`;
          },
        },
      },
      {
        sequelize,
        tableName: 'fotos',
      },
    );
    return this;
  }

  static associate(models: any): void {
    this.belongsTo(models.Aluno, { foreignKey: 'aluno_id' });
  }
}

export default Foto;