import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionService } from '@mepague/transactions-data-access';
import { TransactionTableComponent } from '@mepague/shared-ui';

type FilterType = 'all' | 'pending' | 'paid';

/**
 * Página de histórico com filtros: Todas, Pendentes, Pagas
 */
@Component({
  selector: 'app-historico',
  standalone: true,
  imports: [CommonModule, TransactionTableComponent],
  templateUrl: './historico.component.html',
  styleUrl: './historico.component.scss',
})
export class HistoricoComponent {
  filter = signal<FilterType>('all');

  filteredTransactions = computed(() => {
    const all = this.transactionService.getTransactions();
    const f = this.filter();
    if (f === 'pending') return all.filter((t) => t.status === 'PENDING');
    if (f === 'paid') return all.filter((t) => t.status === 'PAID');
    return all;
  });

  constructor(private transactionService: TransactionService) {}
}
