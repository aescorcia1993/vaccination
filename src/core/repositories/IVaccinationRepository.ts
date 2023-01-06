import Vaccination from "../entities/Vaccination";

interface IVaccinationRepository {
    create(user: any): Promise<Vaccination>;
    update(user: any, id: number): Promise<Vaccination>;
    getAll(): Promise<Vaccination[]>;
    delete(id: number): Promise<number>;
    // validate(dose: number, drug_id: number): Promise<Vaccination>;
  }
  export default IVaccinationRepository;