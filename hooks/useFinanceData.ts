import { useState, useEffect } from 'react';
import { Transaction } from '../types';
import { createClient } from '../lib/supabase';

export const useFinanceData = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const { data, error } = await supabase
          .from('transactions')
          .select('*')
          .order('date', { ascending: false });

        if (error) throw error;
        
        if (data) {
          setTransactions(data as Transaction[]);
        }
      } catch (error) {
        console.error('Error fetching transactions:', error);
      } finally {
        setIsLoaded(true);
      }
    };

    fetchTransactions();
  }, [supabase]);

  const addTransaction = async (transaction: Omit<Transaction, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .insert([
          {
            amount: transaction.amount,
            type: transaction.type,
            category: transaction.category,
            description: transaction.description,
            date: transaction.date,
          }
        ])
        .select()
        .single();

      if (error) throw error;

      if (data) {
        setTransactions((prev) => [data as Transaction, ...prev]);
      }
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  const deleteTransaction = async (id: string) => {
    try {
      const { error } = await supabase
        .from('transactions')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setTransactions((prev) => prev.filter((t) => t.id !== id));
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  const totalIncome = transactions
    .filter((t) => t.type === 'INCOME')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === 'EXPENSE')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  return {
    transactions,
    addTransaction,
    deleteTransaction,
    totalIncome,
    totalExpense,
    balance,
    isLoaded,
  };
};
