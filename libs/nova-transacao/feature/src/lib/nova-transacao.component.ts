import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TransactionService } from '@mepague/transactions-data-access';
import { DebtorService } from '@mepague/debtors-data-access';
import { TransactionFormComponent } from '@mepague/shared-ui';
import type { TransactionFormValue } from '@mepague/shared-ui';

/**
 * Página para adicionar nova transação.
 * Após salvar, redireciona para o Dashboard.
 */
@Component({
  selector: 'app-nova-transacao',
  standalone: true,
  imports: [TransactionFormComponent, RouterLink],
  templateUrl: './nova-transacao.component.html',
  styleUrl: './nova-transacao.component.scss',
})
export class NovaTransacaoComponent {
  constructor(
    private transactionService: TransactionService,
    private debtorService: DebtorService,
    private router: Router
  ) {}

  get debtors() {
    return this.debtorService.getAll();
  }

  onSubmit(formValue: TransactionFormValue): void {
    this.transactionService.addTransaction({
      value: formValue.value,
      description: formValue.description,
      date: new Date(formValue.date),
      debtorId: formValue.debtorId ?? undefined,
      parcelado: formValue.parcelado,
      parcelas: formValue.parcelas,
      cartao: formValue.cartao || undefined,
    });
    this.router.navigate(['/dashboard']);
  }
}
