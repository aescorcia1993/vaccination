import DrugModel from "../../dataSources/sequelize/models/DrugModel";
import { HTTP_STATUS } from "../const/http";
import Vaccination from "../entities/Vaccination";
import VaccinationEntity from "../entities/Vaccination";
import IVaccinationRepository from "../repositories/IVaccinationRepository";
import { IResponse } from "./IResponse";


class VaccinationInteractor {

    vaccinationRepository: IVaccinationRepository

    constructor(vaccinationRepository: IVaccinationRepository) {
        this.vaccinationRepository = vaccinationRepository
    }

    async create(userData: Vaccination): Promise<IResponse<VaccinationEntity>> {
        try {
            
            const drugId = await DrugModel.findOne({ where: { id: userData.drug_id} });
            
            if (!drugId) {
                return { status: HTTP_STATUS.BAD_REQUEST, message: " Drug not found" };
            }
            
            if (!(userData.dose >= drugId.min_dose && userData.dose <= drugId.max_dose)) {
                return { status: HTTP_STATUS.BAD_REQUEST, message: " Dose is not within the allowed range" };
            }
            
            if (new Date().getTime() < drugId.available_at.getTime()) {
                return { status: HTTP_STATUS.BAD_REQUEST, message: " Date not valid" };
            }
            
            const vaccination: VaccinationEntity = await this.vaccinationRepository.create(userData);
        
            return { status: HTTP_STATUS.CREATE, data: vaccination, message: "Vaccination was created successfully" };

        } catch (error) {
            return { status: HTTP_STATUS.INTERNAL_ERROR, message: error.message };
        }
    }

    async update(userData: Vaccination, id: number): Promise<IResponse<Vaccination>> {
        
        try {

            const vaccination: VaccinationEntity = await this.vaccinationRepository.update(userData, id,);

            if (!vaccination){
                return { status: HTTP_STATUS.NOT_FOUND, message: "Vaccination was not found" };
            }

            return { status: HTTP_STATUS.OK, data: vaccination, message: " Vaccination was updated successfully" };
        } catch (error) {
            return { status: HTTP_STATUS.INTERNAL_ERROR, message: error.message };
        }    

    }

    async getAll(): Promise<IResponse<VaccinationEntity[]>> {

        try {
            const vaccinations: VaccinationEntity[] = await this.vaccinationRepository.getAll();

            if (!vaccinations){
                return { status: HTTP_STATUS.NOT_FOUND, message: "Vaccinations was not found" };
            }

            return { status: HTTP_STATUS.OK, data: vaccinations, message: " Vaccination was retrieved successfully" };

        } catch (error) {
            return { status: HTTP_STATUS.INTERNAL_ERROR, message: error.message };
        }
    }
    
    async delete(id: number): Promise<IResponse<number>> {

        try {
            const vaccination: number = await this.vaccinationRepository.delete(id);

            if (!vaccination){
                return { status: HTTP_STATUS.NOT_FOUND, message: "Vaccination was not found" };
            }

            return { status: HTTP_STATUS.OK, data: null, message: " Vaccination was deleted successfully" };

        } catch (error) {
            return { status: HTTP_STATUS.INTERNAL_ERROR, message: error.message };
        }

    }


}

export default VaccinationInteractor
