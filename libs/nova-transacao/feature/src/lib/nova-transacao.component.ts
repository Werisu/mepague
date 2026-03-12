import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TransactionService } from '@mepague/transactions-data-access';
import { TransactionFormComponent } from '@mepague/shared-ui';
import type { TransactionFormValue } from '@mepague/shared-ui';

/**
 * Página para adicionar nova transação.
 * Após salvar, redireciona para o Dashboard.
 */
@Component({
  selector: 'app-nova-transacao',
  standalone: true,
  imports: [TransactionFormComponent],
  template: `
    <div class="max-w-[600px] mx-auto px-4 py-10 md:px-6 md:py-12">
      <header class="mb-8">
        <h1 class="text-3xl font-bold text-slate-800">Nova Transação</h1>
        <p class="mt-2 text-slate-500">Registre um novo valor emprestado</p>
      </header>

      <app-transaction-form (submitForm)="onSubmit($event)" />
    </div>
  `,
})
export class NovaTransacaoComponent {
  constructor(
    private transactionService: TransactionService,
    private router: Router
  ) {}

  onSubmit(formValue: TransactionFormValue): void {
    this.transactionService.addTransaction({
      value: formValue.value,
      description: formValue.description,
      date: new Date(formValue.date),
    });
    this.router.navigate(['/dashboard']);
  }
}
