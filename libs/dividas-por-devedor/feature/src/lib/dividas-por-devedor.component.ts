import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TransactionService } from '@mepague/transactions-data-access';
import { DebtorService } from '@mepague/debtors-data-access';

/**
 * Página que lista todos os devedores com resumo das dívidas
 */
@Component({
  selector: 'app-dividas-por-devedor',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dividas-por-devedor.component.html',
  styleUrl: './dividas-por-devedor.component.scss',
})
export class DividasPorDevedorComponent {
  constructor(
    private transactionService: TransactionService,
    private debtorService: DebtorService
  ) {}

  get debtors() {
    return this.debtorService.getAll();
  }

  getDebtorSummary(debtorId: number) {
    const transactions = this.transactionService.getTransactionsByDebtor(
      debtorId
    );
    const total = transactions.reduce((sum, t) => sum + t.value, 0);
    const pago = transactions
      .filter((t) => t.status === 'PAID')
      .reduce((sum, t) => sum + t.value, 0);
    const pendente = transactions
      .filter((t) => t.status === 'PENDING')
      .reduce((sum, t) => sum + t.value, 0);
    return { total, pago, pendente };
  }
}
