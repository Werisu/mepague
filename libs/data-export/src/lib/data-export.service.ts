import { Injectable } from '@angular/core';
import { DebtorService } from '@mepague/debtors-data-access';
import { TransactionService } from '@mepague/transactions-data-access';
import type { Debtor, Transaction } from '@mepague/shared-util';

export interface MePagueExport {
  version: 1;
  exportedAt: string;
  debtors: Debtor[];
  transactions: Array<Omit<Transaction, 'date'> & { date: string }>;
}

@Injectable({ providedIn: 'root' })
export class DataExportService {
  constructor(
    private debtorService: DebtorService,
    private transactionService: TransactionService
  ) {}

  /**
   * Exporta todos os dados como JSON e inicia download
   */
  export(): void {
    const debtors = this.debtorService.getAll();
    const transactions = this.transactionService.getTransactions().map((t) => ({
      ...t,
      date: t.date instanceof Date ? t.date.toISOString() : (t.date as string),
    }));

    const data: MePagueExport = {
      version: 1,
      exportedAt: new Date().toISOString(),
      debtors,
      transactions,
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mepague-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  /**
   * Importa dados de um arquivo JSON
   * @returns true se importou com sucesso, false se o arquivo é inválido
   */
  import(file: File): Promise<boolean> {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const data = JSON.parse(reader.result as string) as MePagueExport;
          if (!this.isValidExport(data)) {
            resolve(false);
            return;
          }
          this.debtorService.replaceAll(data.debtors);
          this.transactionService.replaceAll(data.transactions);
          resolve(true);
        } catch {
          resolve(false);
        }
      };
      reader.onerror = () => resolve(false);
      reader.readAsText(file);
    });
  }

  private isValidExport(data: unknown): data is MePagueExport {
    if (!data || typeof data !== 'object') return false;
    const d = data as Record<string, unknown>;
    if (d.version !== 1) return false;
    if (!Array.isArray(d.debtors) || !Array.isArray(d.transactions)) return false;
    return true;
  }
}
