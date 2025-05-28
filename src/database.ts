import fs from "node:fs/promises";

const databasePath = new URL("db.json", import.meta.url);

export class Database {
  private database: Record<string, unknown[]> = {};
  private constructor() {
    fs.readFile(databasePath, "utf8")
      .then((data) => {
        this.database = JSON.parse(data);
      })
      .catch(() => {
        this.persist();
      });
  }

  private persist() {
    fs.writeFile(databasePath, JSON.stringify(this.database));
  }

  public select<T>(table: string): T[] {
    const data = this.database[table] ?? [];
    return data as T[];
  }

  public insert<T>(table: string, data: T): T {
    if (Array.isArray(this.database[table])) {
      this.database[table].push(data);
    } else {
      this.database[table] = [data];
    }
    this.persist();

    return data;
  }
}
