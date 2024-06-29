import Category, { CategoryType } from "../schema/Category";

export const createCategory = async (category: CategoryType) => {
  await Category.create(category);
};

export const findCategory = async (id: string) => {
  const category = await Category.findById(id);

  if (!category) return false;

  return category;
};

export const updateCategory = async (id: string, category: CategoryType) => {
  await Category.findByIdAndUpdate(id, category);
};

export const deleteCategory = async (id: string) => {
  await Category.findByIdAndDelete(id);
};
