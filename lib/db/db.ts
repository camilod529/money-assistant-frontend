import * as schema from "@/db/schema";
import migrations from "@/drizzle/migrations";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { migrate } from "drizzle-orm/expo-sqlite/migrator";
import { openDatabaseSync } from "expo-sqlite";
import { DATABASE_NAME } from "../utils/constants";

const sqlite = openDatabaseSync(DATABASE_NAME);
export const db = drizzle(sqlite, { schema });

export async function runMigrations() {
  try {
    await migrate(db, migrations);
    console.log("Migrations completed successfully.");
  } catch (error) {
    console.error("Error running migrations:", error);
  }
}
