import { Static, Type } from "@sinclair/typebox";
import { Schema, model } from "mongoose";

enum Types {
  OUT,
  IN,
}

export const categorySchema = Type.Object({
  createdByAdmin: Type.Boolean(),
  name: Type.String(),
  type: Type.Enum(Types),
});

export type CategoryType = Static<typeof categorySchema>;

const categoryModelSchema = new Schema<CategoryType>({
  createdByAdmin: { type: Boolean, required: true, default: true },
  name: { type: String, required: true },
  type: Types,
});

const Category = model<CategoryType>("categories", categoryModelSchema);

export default Category;
