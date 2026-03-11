export interface Transaction {
  id: number;
  value: number;
  description: string;
  date: Date;
  status: 'PENDING' | 'PAID';
}
