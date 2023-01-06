import Vaccination from "../core/entities/Vaccination";
import IVaccinationRepository from "../core/repositories/IVaccinationRepository";
import VaccinationModel from "./sequelize/models/VaccinationModel";


class VaccinationDataSource implements IVaccinationRepository {

    public async create(userData: Vaccination): Promise<Vaccination> {
        const vaccinationModel: Vaccination = await VaccinationModel.create(userData);
        return vaccinationModel;

    }

    public async update(userData: Vaccination, id: number): Promise<Vaccination> {
        await VaccinationModel.update( userData, { where: { id } });
        const vaccinationModel = await VaccinationModel.findByPk(id);

        return vaccinationModel;
    }

    public async getAll(): Promise<Vaccination[]> {
        const vaccinationModel: Vaccination[] = await VaccinationModel.findAll();
        return vaccinationModel;
    }

    public async delete(id: number): Promise<number> {
        const vaccinationModel: number = await VaccinationModel.destroy({where: { id }});
        return vaccinationModel;
    }
    
}

export default VaccinationDataSource;