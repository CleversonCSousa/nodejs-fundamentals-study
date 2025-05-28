export type User = {
  name: string;
  age: string;
};

export class Database {
  private database: Record<string, unknown[]> = {};

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

    return data;
  }
}
