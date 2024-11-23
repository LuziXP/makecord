import { Database } from "croxydb";

export const db = new Database();

// Örnek kullanım:
// db.set("user_123", { points: 100 });
// const userData = db.get("user_123");
// db.delete("user_123");
// db.has("user_123");
