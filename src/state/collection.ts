import { createModel } from "@rematch/core";
import { uuid } from "uuidv4";
import { db } from "~/storage";
import { Collection, CollectionInput } from "~/types/media";
import { RootModel } from "./models";

export interface IState {
  collections: Collection[];
}
export const CollectionModel = createModel<RootModel>()({
  state: {
    collections: [],
  } as IState,
  reducers: {
    setCollections: (state, payload: Collection[]) => {
      state.collections = payload;
      return state;
    },
    addCollection: (state, payload: Collection) => {
      state.collections.push(payload);
      return state;
    },
    removeTag: (state, tagId: string) => {
      state.collections = state.collections.filter((t) => t.id !== tagId);
      return state;
    },
  },
  effects: (dispatch) => ({
    createCollection: async (input: CollectionInput) => {
      const id = uuid();
      const collection: Collection = { id, ...input, media: [] };
      await db.collections.add(collection);
      dispatch.collection.addCollection(collection);
    },
    deleteCollection: async (tagId: string) => {
      await db.collections.delete(tagId);
      dispatch.collection.removeTag(tagId);
    },
    fetchCollections: async () => {
      const collections = await db.collections.toArray();
      dispatch.collection.setCollections(collections);
    },
  }),
});
