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
  template: `
    <div class="max-w-[920px] mx-auto px-4 py-10 md:px-6 md:py-12">
      <header class="mb-8">
        <h1 class="text-3xl font-bold text-slate-800">Histórico</h1>
        <p class="mt-2 text-slate-500">Todas as transações registradas</p>
      </header>

      <!-- Filtros -->
      <div class="flex gap-2 mb-6">
        <button
          type="button"
          class="px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
          [class]="filter() === 'all'
            ? 'bg-slate-800 text-white'
            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'"
          (click)="filter.set('all')"
        >
          Todas
        </button>
        <button
          type="button"
          class="px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
          [class]="filter() === 'pending'
            ? 'bg-red-600 text-white'
            : 'bg-red-50 text-red-700 hover:bg-red-100'"
          (click)="filter.set('pending')"
        >
          Pendentes
        </button>
        <button
          type="button"
          class="px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
          [class]="filter() === 'paid'
            ? 'bg-green-600 text-white'
            : 'bg-green-50 text-green-700 hover:bg-green-100'"
          (click)="filter.set('paid')"
        >
          Pagas
        </button>
      </div>

      <!-- Tabela (sem ações de edição no histórico) -->
      <app-transaction-table
        [transactions]="filteredTransactions()"
        [showActions]="false"
      />
    </div>
  `,
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
