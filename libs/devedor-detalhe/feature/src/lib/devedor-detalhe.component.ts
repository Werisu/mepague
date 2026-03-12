import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TransactionService } from '@mepague/transactions-data-access';
import { DebtorService } from '@mepague/debtors-data-access';
import {
  PageHeaderComponent,
  SummaryCardComponent,
  TransactionTableComponent,
} from '@mepague/shared-ui';

/**
 * Página para visualizar dívidas de um devedor específico
 */
@Component({
  selector: 'app-devedor-detalhe',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    PageHeaderComponent,
    SummaryCardComponent,
    TransactionTableComponent,
  ],
  templateUrl: './devedor-detalhe.component.html',
  styleUrl: './devedor-detalhe.component.scss',
})
export class DevedorDetalheComponent {
  debtorId?: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private transactionService: TransactionService,
    private debtorService: DebtorService
  ) {
    this.debtorId = Number(this.route.snapshot.paramMap.get('id'));
  }

  get debtor() {
    return this.debtorId
      ? this.debtorService.getById(this.debtorId)
      : undefined;
  }

  get transactions() {
    return this.debtorId
      ? this.transactionService.getTransactionsByDebtor(this.debtorId)
      : [];
  }

  get debtors() {
    return this.debtorService.getAll();
  }

  get totalUtilizado(): number {
    return this.transactions.reduce((sum, t) => sum + t.value, 0);
  }

  get totalPago(): number {
    return this.transactions
      .filter((t) => t.status === 'PAID')
      .reduce((sum, t) => sum + t.value, 0);
  }

  get saldoPendente(): number {
    return this.transactions
      .filter((t) => t.status === 'PENDING')
      .reduce((sum, t) => sum + t.value, 0);
  }

  onMarkAsPaid(transaction: { id: number }): void {
    this.transactionService.markAsPaid(transaction.id);
  }

  onDelete(transaction: { id: number }): void {
    this.transactionService.deleteTransaction(transaction.id);
  }

  onEdit(transaction: { id: number }): void {
    this.router.navigate(['/transacao', transaction.id, 'editar']);
  }
}
