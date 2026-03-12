import { Component, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface TransactionFormValue {
  value: number;
  description: string;
  date: string;
}

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transaction-form.component.html',
})
export class TransactionFormComponent {
  submitForm = output<TransactionFormValue>();

  value = signal(0);
  description = signal('');
  date = signal(new Date().toISOString().split('T')[0]);

  onSubmit(): void {
    const desc = this.description().trim();
    const val = this.value();
    if (!desc || val <= 0) return;

    this.submitForm.emit({
      value: val,
      description: desc,
      date: this.date(),
    });

    this.value.set(0);
    this.description.set('');
    this.date.set(new Date().toISOString().split('T')[0]);
  }
}
