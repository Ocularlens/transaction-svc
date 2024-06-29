import { Static, Type } from "@sinclair/typebox";
import { Schema, model } from "mongoose";
import Category from "./Category";

export const transactionSchema = Type.Object({
  transactionDate: Type.Date(),
  amount: Type.Number(),
  notes: Type.Optional(Type.String()),
  userId: Type.String(),
  category: Type.Unsafe(Category),
});

export type TransactionType = Static<typeof transactionSchema>;

const transactionModelSchema = new Schema<TransactionType>({
  amount: { type: Number, required: true },
  transactionDate: { type: Date, required: true },
  notes: { type: String, required: true },
  userId: { type: String, required: true },
  category: { type: Category, required: false },
});

const Transaction = model<TransactionType>(
  "transactions",
  transactionModelSchema
);

export default Transaction;
