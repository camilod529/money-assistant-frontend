import { Book, book } from "@/db/schema";
import { seedCategories } from "@/db/utils/seed";
import { db } from "@/lib/db/db";
import { v4 as uuidv4 } from "@lukeed/uuid";
import { create } from "zustand";

export interface BookState {
  books: Book[];
  loadBooks: () => Promise<void>;
  addBook: (book: Omit<Book, "id" | "createdAt">) => Promise<void>;
  getBookById: (id: string) => Book | undefined;
}

export const useBooksStore = create<BookState>((set, get) => ({
  books: [],
  loadBooks: async () => {
    const rows = await db.select().from(book);
    for (const b of rows) {
      await seedCategories(b.id);
    }
    set({ books: rows });
  },
  addBook: async (bookPayload) => {
    console.log("Adding book:", bookPayload);
    try {
      const newBookId = uuidv4();
      await db.insert(book).values({
        id: newBookId,
        createdAt: new Date(),
        ...bookPayload,
      });
      await seedCategories(newBookId);
      const rows = await db.select().from(book);
      console.log("Added book, new list:", rows);
      set({ books: rows });
    } catch (error) {
      console.error("Error adding book:", error);
    }
  },
  getBookById: (id) => {
    const book = get().books.find((b) => b.id === id);
    return book;
  },
}));
