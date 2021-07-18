import Dexie from "dexie";
import { Collection, Media, Tag } from "~/types/media";

const DB_VERSION = 1;

interface IDexieDB extends Dexie {
  media: Dexie.Table<Media>;
  tags: Dexie.Table<Tag>;
  collections: Dexie.Table<Collection>;
}

export const db: IDexieDB = new Dexie("gif-collection") as any;
export const initDexie = async () => {
  if (db.isOpen()) return;
  db.version(DB_VERSION).stores({
    media: "id, title, type, tags, createdDate, updatedDate",
    tags: "id, name",
    collections: "id, name, media",
  });
  return db;
};
