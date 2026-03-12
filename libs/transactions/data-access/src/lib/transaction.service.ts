import { Injectable } from '@angular/core';
import { Transaction } from '@mepague/shared-util';

const STORAGE_KEY = 'mepague_transactions';

@Injectable({ providedIn: 'root' })
export class TransactionService {
  private transactions: Transaction[] = [];

  constructor() {
    this.loadFromStorage();
  }

  /**
   * Retorna todas as transações
   */
  getTransactions(): Transaction[] {
    return [...this.transactions];
  }

  /** @deprecated Use getTransactions() */
  getAll(): Transaction[] {
    return this.getTransactions();
  }

  /**
   * Adiciona uma nova transação
   */
  addTransaction(transaction: Omit<Transaction, 'id' | 'status'>): Transaction {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now(),
      status: 'PENDING',
    };
    this.transactions = [newTransaction, ...this.transactions];
    this.saveToStorage();
    return newTransaction;
  }

  /** @deprecated Use addTransaction() */
  add(transaction: Omit<Transaction, 'id' | 'status'>): Transaction {
    return this.addTransaction(transaction);
  }

  /**
   * Marca uma transação como paga
   */
  markAsPaid(id: number): void {
    this.transactions = this.transactions.map((t) =>
      t.id === id ? { ...t, status: 'PAID' as const } : t
    );
    this.saveToStorage();
  }

  /**
   * Alterna o status entre pendente e pago
   */
  toggleStatus(id: number): void {
    this.transactions = this.transactions.map((t) =>
      t.id === id
        ? { ...t, status: t.status === 'PENDING' ? 'PAID' : 'PENDING' }
        : t
    );
    this.saveToStorage();
  }

  /**
   * Remove uma transação
   */
  deleteTransaction(id: number): void {
    this.transactions = this.transactions.filter((t) => t.id !== id);
    this.saveToStorage();
  }

  /**
   * Total emprestado (soma de todas as transações)
   */
  getTotalLoaned(): number {
    return this.transactions.reduce((sum, t) => sum + t.value, 0);
  }

  /** @deprecated Use getTotalLoaned() */
  getTotalEmprestado(): number {
    return this.getTotalLoaned();
  }

  /**
   * Total já recebido (transações com status PAID)
   */
  getTotalPaid(): number {
    return this.transactions
      .filter((t) => t.status === 'PAID')
      .reduce((sum, t) => sum + t.value, 0);
  }

  /** @deprecated Use getTotalPaid() */
  getTotalPago(): number {
    return this.getTotalPaid();
  }

  /**
   * Saldo pendente (transações com status PENDING)
   */
  getPendingBalance(): number {
    return this.transactions
      .filter((t) => t.status === 'PENDING')
      .reduce((sum, t) => sum + t.value, 0);
  }

  /** @deprecated Use getPendingBalance() */
  getSaldoPendente(): number {
    return this.getPendingBalance();
  }

  /**
   * Substitui todas as transações (usado na importação)
   */
  replaceAll(transactions: Array<Omit<Transaction, 'date'> & { date: string | Date }>): void {
    this.transactions = transactions.map((t) => ({
      ...t,
      date: t.date instanceof Date ? t.date : new Date(t.date),
    }));
    this.saveToStorage();
  }

  /**
   * Persiste transações no localStorage
   */
  private saveToStorage(): void {
    const data = this.transactions.map((t) => ({
      ...t,
      date: t.date instanceof Date ? t.date.toISOString() : t.date,
    }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  /**
   * Carrega transações do localStorage
   */
  private loadFromStorage(): void {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Array<Transaction & { date: string }>;
        this.transactions = parsed.map((t) => ({
          ...t,
          date: new Date(t.date),
        }));
      }
    } catch {
      this.transactions = [];
    }
  }
}
