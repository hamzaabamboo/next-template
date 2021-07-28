import { createModel } from "@rematch/core";
import { uuid } from "uuidv4";
import { db } from "~/storage";
import { Media, Tag, TagInput } from "~/types/media";
import { RootModel } from "./models";

export interface IState {
  tags: Tag[];
}
export const TagModel = createModel<RootModel>()({
  state: {
    tags: [],
  } as IState,
  reducers: {
    setTag: (state, payload: Tag[]) => {
      state.tags = payload;
      return state;
    },
    addTag: (state, payload: Tag) => {
      state.tags.push(payload);
      return state;
    },
    removeTag: (state, tagId: string) => {
      state.tags = state.tags.filter((t) => t.id !== tagId);
      return state;
    },
  },
  effects: (dispatch) => ({
    createTag: async (input: TagInput) => {
      const id = uuid();
      const tag: Tag = { id, ...input };
      await db.tags.add(tag);
      dispatch.tag.addTag(tag);
    },
    deleteTag: async (tagId: string) => {
      await db.tags.delete(tagId);
      const media = await db.media.where("tags").equals(tagId).toArray();
      const newMedia = media.map((m) => ({
        ...m,
        tags: m.tags.filter((t) => t !== tagId),
      }));
      await db.media.bulkPut(newMedia);
      dispatch.tag.removeTag(tagId);
      dispatch.media.bulkUpdateMedia(newMedia);
    },
    fetchTags: async () => {
      const tags = await db.tags.toArray();
      dispatch.tag.setTag(tags);
    },
  }),
});
