import { Schema, model } from "mongoose";
import Category, { ICategory } from "./Category";

interface ITransaction {
  transactionDate: Date;
  amount: Number;
  notes: string;
  userId: string;
  category: ICategory;
}

const transactionSchema = new Schema<ITransaction>({
  amount: { type: Number, required: true },
  transactionDate: { type: Date, required: true },
  notes: { type: String, required: true },
  userId: { type: String, required: true },
  category: { type: Category, required: true },
});

const Transaction = model<ITransaction>("transactions", transactionSchema);

export default Transaction;
