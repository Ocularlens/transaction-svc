import Transaction, { TransactionType } from "../schema/Transaction";

export const createTransaction = async (transaction: TransactionType) => {
  return await Transaction.create(transaction);
};

export const findTransaction = async (id: string) => {
  const transaction = await Transaction.findById(id);

  if (!transaction) return false;

  return transaction;
};

export const updateTransaction = async (
  id: string,
  transaction: TransactionType
) => {
  return await Transaction.findByIdAndUpdate(id, { transaction });
};

export const deleteTransaction = async (id: string) => {
  await Transaction.findByIdAndDelete(id);
};

export const fetchUserTransactions = async (userId: string) => {
  return await Transaction.find({ userId });
};
