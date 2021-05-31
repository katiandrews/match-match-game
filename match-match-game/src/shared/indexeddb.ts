import { UsersData } from '../models/user-data-model';

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
      usersStore.createIndex('avatar', 'avatar');
      usersStore.createIndex('score', 'score');
      this.db = database;
    };

    openRequest.onsuccess = () => {
      this.db = openRequest.result;
    };
  }

  write(name: string, surname: string, email: string, avatar: string): void {
    if (this.db) {
      const transaction = this.db.transaction('users', 'readwrite');
      const usersStore = transaction.objectStore('users');
      usersStore.put({
        name,
        surname,
        email,
        avatar,
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
        const elementsArray: Array<UsersData> = getAll.result;
        const lastElementIndex = elementsArray.length - 1;
        const lastElement = elementsArray[lastElementIndex];
        this.db?.transaction('users', 'readwrite').objectStore('users').put({
          name: lastElement.name,
          surname: lastElement.surname,
          email: lastElement.email,
          avatar: lastElement.avatar,
          id: lastElement.id,
          score: userScore,
        });
      };
    }
  }

  // getLastElementProperty() {
  //   return new Promise<Array<UsersData>>((resolve) => {
  //     if (this.db) {
  //       const transaction = this.db.transaction('users', 'readonly');
  //       const usersStore = transaction.objectStore('users');
  //       const result = usersStore.index('avatar').openCursor(null, 'prev');

  //       result.onsuccess = () => {
  //         const cursor = result.result;
  //         if(cursor) console.log(cursor.key);
  //       }
  //     }
  //   });
  // }

  readAll(collection: string): Promise<Array<UsersData>> {
    return new Promise((resolve, reject) => {
      if (this.db) {
        const transaction = this.db.transaction(collection, 'readonly');
        const usersStore = transaction.objectStore(collection);
        const result = usersStore.getAll();

        transaction.oncomplete = () => {
          resolve(result.result);
        };
        transaction.onerror = () => {
          reject(result.error);
        };
      }
    });
  }

  readFilteredScore(): Promise<Array<UsersData>> {
    return new Promise<Array<UsersData>>((resolve) => {
      if (this.db) {
        const transaction = this.db.transaction('users', 'readonly');
        const usersStore = transaction.objectStore('users');
        const result = usersStore.index('score').openCursor(null, 'prev');
        const resData: Array<UsersData> = [];

        result.onsuccess = () => {
          const cursor = result.result;
          if (cursor && resData.length < 10) {
            resData.push(cursor.value);
            cursor.continue();
          }
        };
        transaction.oncomplete = () => {
          resolve(resData);
        };
      }
    });
  }
}
