export interface Transaction {
  id: number;
  value: number;
  description: string;
  date: Date;
  status: 'PENDING' | 'PAID';
  /** Se a compra foi parcelada */
  parcelado?: boolean;
  /** Número de parcelas (quando parcelado) */
  parcelas?: number;
  /** Cartão utilizado (ex: Nubank, Itaú) */
  cartao?: string;
}
