import Drug from "../core/entities/Drug";
import IDrugRepository from "../core/repositories/IDrugRepository";
import DrugModel from "./sequelize/models/DrugModel";


class DrugDataSource implements IDrugRepository {

    public async create(userData: Drug): Promise<Drug> {
        const drugModel : Drug = await DrugModel.create(userData);
        return drugModel;
    }

    public async update(userData: Drug, id: number): Promise<Drug> {

        await DrugModel.update( userData, { where: { id } });
        const drugModel = await DrugModel.findByPk(id);

        return drugModel;
    }

    public async getAll(): Promise<Drug[]> {
        const drugModel: Drug[] = await DrugModel.findAll();
        return drugModel;
    }

    public async delete(id: number): Promise<number> {
        const drugModel: number = await DrugModel.destroy({where: { id }});
        return drugModel;
    }
    
}

export default DrugDataSource;
