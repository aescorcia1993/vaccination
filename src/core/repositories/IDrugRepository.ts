import Drug from '../entities/Drug';

interface IDrugRepository {
  create(user: any): Promise<Drug>;
  update(user: any, id: number): Promise<Drug>;
  getAll(): Promise<Drug[]>;
  delete(id: number): Promise<number>;

}
export default IDrugRepository;