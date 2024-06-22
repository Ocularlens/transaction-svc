import { Schema, model } from "mongoose";

export interface ICategory {
  createdByAdmin: boolean;
  name: string;
  type: "OUT" | "IN";
}

const categorySchema = new Schema<ICategory>({
  createdByAdmin: { type: Boolean, required: true, default: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
});

const Category = model<ICategory>("categories", categorySchema);

export default Category;
