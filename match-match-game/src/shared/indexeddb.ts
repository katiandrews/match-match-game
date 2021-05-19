export class Database {
  public db: IDBDatabase | null;

  constructor() {
    this.db = null;
  }

  init(dbName: string, version?: number): void {
    const iDB = window.indexedDB;
    const openRequest = iDB.open(dbName, version);
    openRequest.onupgradeneeded = () => {
      const database = openRequest.result;
      const usersStore = database.createObjectStore('users', {
        keyPath: 'id',
        autoIncrement: true,
      });
      usersStore.createIndex('name', 'name');
      usersStore.createIndex('email', 'email', { unique: true });
      this.db = database;
    };

    openRequest.onsuccess = () => {
      this.db = openRequest.result;
    };
  }

  write(
    data1: string | number,
    data2: string | number,
    data3: string | number
  ): void {
    if (this.db) {
      const transaction = this.db.transaction('users', 'readwrite');
      const usersStore = transaction.objectStore('users');
      const result = usersStore.put({
        name: data1,
        surname: data2,
        email: data3,
      });
      result.onsuccess = () => {
        console.log('complete!', result.result);
      };
      result.onerror = () => {
        console.log('error!', result.error);
      };
      transaction.onabort = () => {
        console.log('abort!');
      };
    }
  }

  readAll(): void {
    if (this.db) {
      const transaction = this.db.transaction('users', 'readonly');
      const usersStore = transaction.objectStore('users');
      const result = usersStore.getAll();

      transaction.oncomplete = () => {
        console.log(result.result);
      };
    }
  }

  readFilteredScore(): void {
    if (this.db) {
      const transaction = this.db.transaction('users', 'readonly');
      const usersStore = transaction.objectStore('users');
      const result = usersStore.index('email').openCursor(null, 'prev');
      const resData: Array<number> = [];
      result.onsuccess = () => {
        const cursor = result.result;
        if (cursor) {
          console.log(cursor.value);
          resData.push(cursor.value);
          cursor.continue();
        }
      };

      transaction.oncomplete = () => {
        console.log(resData);
      };
    }
  }
}
