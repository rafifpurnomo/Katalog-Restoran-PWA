import { openDB } from "idb";

const DATABASE_NAME = "fav-resto";
const OBJECT_STORE_NAME = "resto";

const dbPromise = openDB(DATABASE_NAME, 1, {
  upgrade(database) {
    database.createObjectStore(OBJECT_STORE_NAME, { keyPath: "id" });
  },
});

const FavoriteRestoIdb = {
    async getResto(id) {
      return (await dbPromise).get(OBJECT_STORE_NAME, id);
    },
  
    async getAllResto() {
      return (await dbPromise).getAll(OBJECT_STORE_NAME);
    },
  
    async putResto(resto) {
      return (await dbPromise).put(OBJECT_STORE_NAME, resto);
    },
  
    async deleteResto(id) {
      return (await dbPromise).delete(OBJECT_STORE_NAME, id);
    }
  };
  
  export default FavoriteRestoIdb;
