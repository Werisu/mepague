import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TransactionService } from '@mepague/transactions-data-access';
import { DebtorService } from '@mepague/debtors-data-access';
import { TransactionFormComponent } from '@mepague/shared-ui';
import type { TransactionFormValue } from '@mepague/shared-ui';

/**
 * Página para editar uma transação existente
 */
@Component({
  selector: 'app-editar-transacao',
  standalone: true,
  imports: [TransactionFormComponent, RouterLink],
  templateUrl: './editar-transacao.component.html',
  styleUrl: './editar-transacao.component.scss',
})
export class EditarTransacaoComponent {
  transaction?: ReturnType<TransactionService['getById']>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private transactionService: TransactionService,
    private debtorService: DebtorService
  ) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.transaction = this.transactionService.getById(id);
  }

  get debtors() {
    return this.debtorService.getAll();
  }

  onSubmit(formValue: TransactionFormValue): void {
    if (!formValue.id) return;

    this.transactionService.updateTransaction(formValue.id, {
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
