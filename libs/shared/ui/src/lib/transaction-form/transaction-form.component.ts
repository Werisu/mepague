import { Component, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface TransactionFormValue {
  value: number;
  description: string;
  date: string;
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

  value = signal(0);
  description = signal('');
  date = signal(new Date().toISOString().split('T')[0]);
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
      parcelado: parceladoVal,
      parcelas: parcelasVal,
      cartao: this.cartao().trim(),
    });

    this.value.set(0);
    this.description.set('');
    this.date.set(new Date().toISOString().split('T')[0]);
    this.parcelado.set(false);
    this.parcelas.set(1);
    this.cartao.set('');
  }
}
