import { Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface TransactionFormValue {
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

  value = signal(0);
  description = signal('');
  date = signal(new Date().toISOString().split('T')[0]);
  debtorId = signal<number | null>(null);
  parcelado = signal(false);
  parcelas = signal(1);
  cartao = signal('');

  onSubmit(): void {
    const desc = this.description().trim();
    const val = this.value();
    if (!desc || val <= 0) return;

    const parceladoVal = this.parcelado();
    const parcelasVal = parceladoVal ? Math.max(1, this.parcelas()) : 1;

    this.submitForm.emit({
      value: val,
      description: desc,
      date: this.date(),
      debtorId: this.debtorId(),
      parcelado: parceladoVal,
      parcelas: parcelasVal,
      cartao: this.cartao().trim(),
    });

    this.value.set(0);
    this.description.set('');
    this.date.set(new Date().toISOString().split('T')[0]);
    this.debtorId.set(null);
    this.parcelado.set(false);
    this.parcelas.set(1);
    this.cartao.set('');
  }
}
