import { Model, DataTypes, Optional } from 'sequelize';

import VaccinationAttributes from '../../../core/entities/Vaccination';
import sequelizeInstance from '../index';

type VaccinationCreationAttributes = Optional<VaccinationAttributes, 'id'>

class Vaccination
  extends Model<VaccinationAttributes, VaccinationCreationAttributes>
  implements VaccinationAttributes
{
  public id!: number;
  public name!: string;
  public dose!: number;
  public date!: Date;

}

Vaccination.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
          },
          name: {
            type: new DataTypes.STRING(128),
            allowNull: false,
          },
          dose: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 0,
          },
          date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
          },  
    },
    {
        timestamps: false,
        tableName: 'vaccination',
        sequelize: sequelizeInstance,
    },
);

export default Vaccination;
