export class Database {
  public db: IDBDatabase | null = null;

  constructor() {}

  init(dbName: string, version?: number) {
    const iDB = window.indexedDB;
    const openRequest = iDB.open(dbName, version);
    openRequest.onupgradeneeded = () => {
      let database = openRequest.result;
      let usersStore = database.createObjectStore('users', {
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
  ) {
    if (this.db) {
      let transaction = this.db.transaction('users', 'readwrite');
      let usersStore = transaction.objectStore('users');
      let result = usersStore.put({
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

  readAll() {
    if (this.db) {
      let transaction = this.db.transaction('users', 'readonly');
      let usersStore = transaction.objectStore('users');
      let result = usersStore.getAll();

      transaction.oncomplete = () => {
        console.log(result.result);
      };
    }
  }

  readFilteredScore() {
    if (this.db) {
      let transaction = this.db.transaction('users', 'readonly');
      let usersStore = transaction.objectStore('users');
      let result = usersStore.index('email').openCursor(null, 'prev');
      let resData: Array<number> = [];
      result.onsuccess = () => {
        let cursor = result.result;
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
