"use client";

import React, { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface Transaction {
  id: string;
  amount: number;
  description: string;
  createdAt: string;
}

const WalletCard = () => {
  const [balance, setBalance] = useState<number | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const fetchBalance = async () => {
    try {
      const response = await fetch("/api/wallet/balance");
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || "Failed to fetch data");
        return;
      }
      const data = await response.json();
      console.log("Fetched Balance Data:", data);
      setBalance(data.balance);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  const fetchTransactions = async () => {
    try {
      const response = await fetch("/api/wallet/transactions");
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || "Failed to fetch data");
        return;
      }
      const data = await response.json();
      console.log("Fetched Transactions Data:", data);
      setTransactions(data.transactions || []);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchBalance(), fetchTransactions()]);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#111827]">
        <AiOutlineLoading3Quarters className="text-4xl text-blue-700 animate-spin" />
        <span className="ml-4 text-lg text-gray-600">
          Loading Please Wait.....
        </span>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="max-w-3xl mx-auto bg-gray-800 text-white p-6 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Wallet</h1>

      {/* Wallet Balance Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Wallet Balance</h2>
        <div className="mt-2 p-4 bg-gray-700 rounded-lg text-lg">
          {balance !== null ? `₹${balance}` : "Balance not available"}
        </div>
      </div>

      {/* Transactions Section */}
      <div>
        <h2 className="text-xl font-semibold">Transactions</h2>
        {transactions.length > 0 ? (
          <div className="mt-4 space-y-4">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="p-4 bg-gray-700 rounded-lg flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">{transaction.description}</p>
                  <p className="text-sm text-gray-400">
                    {new Date(transaction.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <p className="font-semibold">₹{transaction.amount}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-2 p-4 bg-gray-700 rounded-lg text-center text-gray-400">
            No transactions found
          </div>
        )}
      </div>
    </div>
  );
};

export default WalletCard;
