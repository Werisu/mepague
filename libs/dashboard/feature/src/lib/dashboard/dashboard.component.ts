import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TransactionService } from '@mepague/transactions-data-access';
import { DebtorService } from '@mepague/debtors-data-access';
import {
  PageHeaderComponent,
  SummaryCardComponent,
  TransactionTableComponent,
} from '@mepague/shared-ui';

/**
 * Dashboard principal - exibe resumo e tabela de transações
 */
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    PageHeaderComponent,
    SummaryCardComponent,
    TransactionTableComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  constructor(
    protected transactionService: TransactionService,
    protected debtorService: DebtorService,
    private router: Router
  ) {}

  get debtors() {
    return this.debtorService.getAll();
  }

  get transactions() {
    return this.transactionService.getTransactions();
  }

  get totalEmprestado(): number {
    return this.transactionService.getTotalLoaned();
  }

  get totalRecebido(): number {
    return this.transactionService.getTotalPaid();
  }

  get saldoPendente(): number {
    return this.transactionService.getPendingBalance();
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
