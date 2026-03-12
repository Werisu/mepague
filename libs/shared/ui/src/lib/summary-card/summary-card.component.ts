import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-summary-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './summary-card.component.html',
})
export class SummaryCardComponent {
  label = input.required<string>();
  value = input.required<string>();
  variant = input<'default' | 'paid' | 'pending'>('default');
}
