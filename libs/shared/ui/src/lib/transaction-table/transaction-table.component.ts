import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Transaction } from '@mepague/shared-util';

@Component({
  selector: 'app-transaction-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transaction-table.component.html',
})
export class TransactionTableComponent {
  transactions = input.required<Transaction[]>();
  statusToggle = output<Transaction>();

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('pt-BR');
  }

  formatCurrency(value: number): string {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }

  onToggleStatus(transaction: Transaction): void {
    this.statusToggle.emit(transaction);
  }
}
