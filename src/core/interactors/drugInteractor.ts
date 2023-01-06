import { HTTP_STATUS } from "../const/http";
import Drug from "../entities/Drug";
import DrugEntity from "../entities/Drug";
import IDrugRepository from "../repositories/IDrugRepository";
import { IResponse } from "./IResponse";



class DrugInteractor {

    drugRepository: IDrugRepository;

    constructor(drugRepository: IDrugRepository) {
        this.drugRepository = drugRepository;
    }

    async create(userData: Drug): Promise<IResponse<DrugEntity>>{

        try {
            const drug: DrugEntity = await this.drugRepository.create(userData);

            return { status: HTTP_STATUS.CREATE, data: drug, message: "Success" };

        } catch (error) {
            return {status: HTTP_STATUS.INTERNAL_ERROR, message: error.message};
        }

    }

    async update(userData: Drug, id: number): Promise<IResponse<DrugEntity>>{

        try {
            
            const drug: DrugEntity = await this.drugRepository.update(userData, id,);

            if(!drug){
                return {status: HTTP_STATUS.NOT_FOUND, message: "Drug not found with id: " + id};
            }

            return {status: HTTP_STATUS.OK, data: drug, message: "success update"};

        } catch (error) {
            return {status: HTTP_STATUS.INTERNAL_ERROR, message: error.message};
        }

    }

    async getAll(): Promise<IResponse<DrugEntity[]>>{
        try {
            const drug: DrugEntity[] = await this.drugRepository.getAll();

            if(!drug){
                return {status: HTTP_STATUS.NOT_FOUND, message: "Drug not found in the system."};
            }

            return {status: HTTP_STATUS.OK, data: drug, message: "success in getting all drug."};

        } catch (error) {
            return {status: HTTP_STATUS.INTERNAL_ERROR, message: error.message};
        }
    }

    async delete(id: number): Promise<IResponse<any>>{
        try {
            const drug: number = await this.drugRepository.delete(id);

            if(!drug){
                return {status: HTTP_STATUS.NOT_FOUND, message: "Drug not found in the system."};
            }

            return {status: HTTP_STATUS.OK, data: null, message: "Success in deleting drug."};

        } catch (error) {
            return {status: HTTP_STATUS.INTERNAL_ERROR, message: error.message};
        }
    }
    
}

export default DrugInteractor;