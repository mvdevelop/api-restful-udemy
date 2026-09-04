import { Sequelize, Model, DataTypes } from 'sequelize';

class Aluno extends Model {
  public id!: number;
  public nome!: string;
  public sobrenome!: string;
  public email!: string;
  public idade!: number | null;
  public peso!: number | null;
  public altura!: number | null;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;

  static init(sequelize: Sequelize): typeof Aluno {
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
        },
        sobrenome: {
          type: DataTypes.STRING,
          defaultValue: '',
        },
        email: {
          type: DataTypes.STRING,
          defaultValue: '',
          unique: true,
        },
        idade: {
          type: DataTypes.INTEGER,
          defaultValue: null,
        },
        peso: {
          type: DataTypes.FLOAT,
          defaultValue: null,
        },
        altura: {
          type: DataTypes.FLOAT,
          defaultValue: null,
        },
      },
      {
        sequelize,
        tableName: 'alunos',
      },
    );
    return this;
  }

  static associate(models: any): void {
    this.hasMany(models.Foto, { foreignKey: 'aluno_id' });
  }
}

export default Aluno;