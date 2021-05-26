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
      usersStore.createIndex('score', 'score');
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
    }
  }

  addScore(score: number): void {
    // TODO: FIX THIS
    if (this.db) {
      const transaction = this.db.transaction('users', 'readwrite');
      const usersStore = transaction.objectStore('users');
      const elementsArray = usersStore.getAll();

      elementsArray.onsuccess = () => {
        const { result } = elementsArray;
        const lastElement = usersStore.get(result.length - 1);
        lastElement.onsuccess = () => {
          const element = usersStore.put({
            id: lastElement.result.id,
            score: `${score}`,
          });
          // element.onsuccess = () => {
          //   console.log('complete!', element.result);
          // };
          // element.onerror = () => {
          //   console.log('error!', element.error);
          // };
        };
      };
    }
  }

  readAll(): void | Record<string, unknown> {
    if (this.db) {
      const transaction = this.db.transaction('users', 'readonly');
      const usersStore = transaction.objectStore('users');
      const result = usersStore.getAll();

      transaction.oncomplete = () => {
        return result.result;
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
          // console.log(cursor.value);
          resData.push(cursor.value);
          cursor.continue();
        }
      };

      transaction.oncomplete = () => {
        // console.log(resData);
      };
    }
  }
}
