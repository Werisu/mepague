import { Injectable } from '@angular/core';
import { Debtor } from '@mepague/shared-util';

const STORAGE_KEY = 'mepague_debtors';

@Injectable({ providedIn: 'root' })
export class DebtorService {
  private debtors: Debtor[] = [];

  constructor() {
    this.loadFromStorage();
  }

  getAll(): Debtor[] {
    return [...this.debtors];
  }

  getById(id: number): Debtor | undefined {
    return this.debtors.find((d) => d.id === id);
  }

  add(name: string): Debtor {
    const debtor: Debtor = {
      id: Date.now(),
      name: name.trim(),
    };
    this.debtors = [...this.debtors, debtor];
    this.saveToStorage();
    return debtor;
  }

  update(id: number, name: string): void {
    this.debtors = this.debtors.map((d) =>
      d.id === id ? { ...d, name: name.trim() } : d
    );
    this.saveToStorage();
  }

  delete(id: number): void {
    this.debtors = this.debtors.filter((d) => d.id !== id);
    this.saveToStorage();
  }

  /**
   * Substitui todos os devedores (usado na importação)
   */
  replaceAll(debtors: Debtor[]): void {
    this.debtors = [...debtors];
    this.saveToStorage();
  }

  private saveToStorage(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.debtors));
  }

  private loadFromStorage(): void {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        this.debtors = JSON.parse(stored);
      }
    } catch {
      this.debtors = [];
    }
  }
}
