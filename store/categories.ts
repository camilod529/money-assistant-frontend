import { category, Category } from "@/db/schema";
import { db } from "@/lib/db/db";
import { v4 as uuidv4 } from "@lukeed/uuid";
import { eq } from "drizzle-orm";
import { create } from "zustand";

interface CategoriesState {
  categories: Category[];
  loadCategories: (bookId: string) => Promise<void>;
  addCategory: (category: Omit<Category, "id">) => Promise<void>;
  getCategoryById: (id: string) => Category | undefined;
}

export const useCategoriesStore = create<CategoriesState>((set, get) => ({
  categories: [],
  loadCategories: async (bookId) => {
    const rows = await db
      .select()
      .from(category)
      .where(eq(category.bookId, bookId));
    set({ categories: rows });
  },
  addCategory: async (categoryPayload) => {
    const newCategory = { ...categoryPayload, id: uuidv4() };
    await db.insert(category).values(newCategory);
    set((state) => ({ categories: [...state.categories, newCategory] }));
  },
  getCategoryById: (id) => {
    return get().categories.find((c) => c.id === id);
  },
}));
