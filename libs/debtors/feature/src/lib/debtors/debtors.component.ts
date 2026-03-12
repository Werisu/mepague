import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DebtorService } from '@mepague/debtors-data-access';

/**
 * Página para cadastrar e listar pessoas devedoras
 */
@Component({
  selector: 'app-debtors',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './debtors.component.html',
  styleUrl: './debtors.component.scss',
})
export class DebtorsComponent {
  newName = '';

  constructor(protected debtorService: DebtorService) {}

  get debtors() {
    return this.debtorService.getAll();
  }

  onAdd(): void {
    const name = this.newName.trim();
    if (!name) return;
    this.debtorService.add(name);
    this.newName = '';
  }

  onDelete(id: number): void {
    this.debtorService.delete(id);
  }
}
