import { Component, effect, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import type { Transaction } from '@mepague/shared-util';

export interface TransactionFormValue {
  id?: number;
  value: number;
  description: string;
  date: string;
  debtorId: number | null;
  parcelado: boolean;
  parcelas: number;
  cartao: string;
}

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transaction-form.component.html',
  styleUrl: './transaction-form.component.scss',
})
export class TransactionFormComponent {
  submitForm = output<TransactionFormValue>();

  /** Lista de devedores para o select */
  debtors = input.required<{ id: number; name: string }[]>();
  /** Transação para edição (modo edição) */
  transaction = input<Transaction | null>(null);

  value = signal(0);
  description = signal('');
  date = signal(new Date().toISOString().split('T')[0]);
  debtorId = signal<number | null>(null);
  parcelado = signal(false);
  parcelas = signal(1);
  cartao = signal('');

  constructor() {
    effect(() => {
      const t = this.transaction();
      if (t) {
        this.value.set(t.value);
        this.description.set(t.description);
        this.date.set(
          t.date instanceof Date
            ? t.date.toISOString().split('T')[0]
            : new Date(t.date).toISOString().split('T')[0]
        );
        this.debtorId.set(t.debtorId ?? null);
        this.parcelado.set(t.parcelado ?? false);
        this.parcelas.set(t.parcelas ?? 1);
        this.cartao.set(t.cartao ?? '');
      }
    });
  }

  get isEditMode(): boolean {
    return !!this.transaction();
  }

  onSubmit(): void {
    const desc = this.description().trim();
    const val = this.value();
    if (!desc || val <= 0) return;

    const parceladoVal = this.parcelado();
    const parcelasVal = parceladoVal ? Math.max(1, this.parcelas()) : 1;

    this.submitForm.emit({
      id: this.transaction()?.id,
      value: val,
      description: desc,
      date: this.date(),
      debtorId: this.debtorId(),
      parcelado: parceladoVal,
      parcelas: parcelasVal,
      cartao: this.cartao().trim(),
    });

    if (!this.isEditMode) {
      this.value.set(0);
      this.description.set('');
      this.date.set(new Date().toISOString().split('T')[0]);
      this.debtorId.set(null);
      this.parcelado.set(false);
      this.parcelas.set(1);
      this.cartao.set('');
    }
  }
}
