import { Injectable } from '@angular/core';
import { Transaction } from '@mepague/shared-util';

@Injectable({ providedIn: 'root' })
export class TransactionService {
  private transactions: Transaction[] = [];

  getAll(): Transaction[] {
    return [...this.transactions];
  }

  add(transaction: Omit<Transaction, 'id' | 'status'>): Transaction {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now(),
      status: 'PENDING',
    };
    this.transactions = [newTransaction, ...this.transactions];
    return newTransaction;
  }

  toggleStatus(id: number): void {
    this.transactions = this.transactions.map((t) =>
      t.id === id ? { ...t, status: t.status === 'PENDING' ? 'PAID' : 'PENDING' } : t
    );
  }

  getTotalEmprestado(): number {
    return this.transactions.reduce((sum, t) => sum + t.value, 0);
  }

  getTotalPago(): number {
    return this.transactions
      .filter((t) => t.status === 'PAID')
      .reduce((sum, t) => sum + t.value, 0);
  }

  getSaldoPendente(): number {
    return this.transactions
      .filter((t) => t.status === 'PENDING')
      .reduce((sum, t) => sum + t.value, 0);
  }
}
