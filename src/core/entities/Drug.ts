export default interface Drug {
    id: number;
    name: string;
    approved: boolean;
    min_dose: number;
    max_dose: number;
    available_at?: Date;
  }