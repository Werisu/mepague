import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionService } from '@mepague/transactions-data-access';
import {
  PageHeaderComponent,
  SummaryCardComponent,
  TransactionFormComponent,
  TransactionTableComponent,
} from '@mepague/shared-ui';
import type { TransactionFormValue } from '@mepague/shared-ui';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    PageHeaderComponent,
    SummaryCardComponent,
    TransactionFormComponent,
    TransactionTableComponent,
  ],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  constructor(protected transactionService: TransactionService) {}

  get transactions() {
    return this.transactionService.getAll();
  }

  get totalEmprestado(): number {
    return this.transactionService.getTotalEmprestado();
  }

  get totalPago(): number {
    return this.transactionService.getTotalPago();
  }

  get saldoPendente(): number {
    return this.transactionService.getSaldoPendente();
  }

  onAddTransaction(formValue: TransactionFormValue): void {
    this.transactionService.add({
      value: formValue.value,
      description: formValue.description,
      date: new Date(formValue.date),
    });
  }

  onToggleStatus(transaction: { id: number }): void {
    this.transactionService.toggleStatus(transaction.id);
  }
}
