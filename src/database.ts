import fs from "node:fs/promises";

const databasePath = new URL("db.json", import.meta.url);

export class Database {
  private database: Record<string, unknown[]> = {};
  public constructor() {
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

  public delete(table: string, id: string) {
    const tableData = this.database[table];

    if (Array.isArray(tableData)) {
      const rowIndex = (tableData as { id: string }[]).findIndex(
        (row) => row.id === id
      );

      if (rowIndex > -1) {
        tableData.splice(rowIndex, 1);
        this.persist();
      }
    }
  }

  public update<T>(table: string, id: string, data: Omit<T, "id">) {
    const tableData = this.database[table];

    if (Array.isArray(tableData)) {
      const rowIndex = (tableData as { id: string }[]).findIndex(
        (row) => row.id === id
      );

      if (rowIndex > -1) {
        tableData[rowIndex] = { id, ...data };
        this.persist();
      }
    }
  }
}
