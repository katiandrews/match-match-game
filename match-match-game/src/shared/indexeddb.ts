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
      console.log(usersStore.index('score'));
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
      usersStore.put({
        name: data1,
        surname: data2,
        email: data3,
        score: 0,
      });
    }
  }

  addScore(userScore: number): void {
    if (this.db) {
      const transaction = this.db.transaction('users', 'readwrite');
      const usersStore = transaction.objectStore('users');
      const getAll = usersStore.getAll();

      transaction.oncomplete = () => {
        const elementsArray = getAll.result;
        const lastElementIndex = elementsArray.length-1;
        const lastElement = elementsArray[lastElementIndex];
        console.log(lastElement);
        this.db?.transaction('users', 'readwrite')
                .objectStore('users')
                .put({
                  name: lastElement.name,
                  surname: lastElement.surname,
                  email: lastElement.email,
                  id: lastElement.id,
                  score: userScore});
      };
    };
  }

  readAll(): void | Record<string, unknown> {
    if (this.db) {
      const transaction = this.db.transaction('users', 'readonly');
      const usersStore = transaction.objectStore('users');
      const result = usersStore.getAll();

      result.onsuccess = () => {
        return result.result;
      };
    }
  }

  readFilteredScore(): void {
    if (this.db) {
      const transaction = this.db.transaction('users', 'readonly');
      const usersStore = transaction.objectStore('users');
      const result = usersStore.index('score').openCursor(null, 'prev');
      const resData: Array<number> = [];
      result.onsuccess = () => {
        const cursor = result.result;
        for (let i = 0; i < 10; i += 1) {
          if (cursor) {
          console.log(cursor.value);
          resData.push(cursor.value);
          cursor.continue();
        }
        }
      };

      transaction.oncomplete = () => {
        console.log(resData);
      };
    }
  }
}

