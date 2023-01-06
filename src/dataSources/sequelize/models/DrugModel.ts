import { Model, DataTypes, Optional } from 'sequelize';

import DrugAttributes from '../../../core/entities/Drug';
import sequelizeInstance from '../index';
import Vaccination from './VaccinationModel';

type DrugCreationAttributes = Optional<DrugAttributes, 'id'>

class Drug
  extends Model<DrugAttributes, DrugCreationAttributes>
  implements DrugAttributes
{
  public id!: number;
  public name!: string;
  public approved!: boolean;
  public min_dose!: number;
  public max_dose!: number;
  public available_at: Date;

}

Drug.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: new DataTypes.STRING(128),
            allowNull: false,
            unique: true,
        },
        approved: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        min_dose: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 0,
        },
        max_dose: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 0,
        },
        available_at: {
            type : DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        timestamps: false,
        tableName: 'drug',
        sequelize: sequelizeInstance,
    },
);

Drug.hasMany(Vaccination, {
    foreignKey: 'drug_id',
    sourceKey: 'id'
});

Vaccination.belongsTo(Drug, { 
    foreignKey: 'drug_id',
    targetKey: 'id',
});

export default Drug;