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
  templateUrl: './nova-transacao.component.html',
  styleUrl: './nova-transacao.component.scss',
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
      parcelado: formValue.parcelado,
      parcelas: formValue.parcelas,
      cartao: formValue.cartao || undefined,
    });
    this.router.navigate(['/dashboard']);
  }
}
