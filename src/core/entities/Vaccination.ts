export default interface Vaccination {
    id: number;
    name: string;
    dose: number;
    drug_id?: number
    date?: Date;
}