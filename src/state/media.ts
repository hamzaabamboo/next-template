import { createModel } from "@rematch/core";
import { m } from "framer-motion";
import { uuid } from "uuidv4";
import { db } from "~/storage";
import { Collection, Media, MediaInput, Tag, TagInput } from "~/types/media";
import { RootModel } from "./models";

interface IState {
  media: Media[];
}

export const MediaModel = createModel<RootModel>()({
  state: {
    media: [],
  } as IState,
  reducers: {
    setMedia(state, media: Media[]) {
      state.media = media;
      return state;
    },
    addMedia(state, media: Media) {
      state.media.push(media);
      return state;
    },
    bulkUpdateMedia(state, media: Media[]) {
      const indexes = media.map((m) => m.id);
      state.media = state.media.map((s) => {
        return indexes.includes(s.id)
          ? (media.find((n) => n.id === s.id) as Media)
          : s;
      });
      return state;
    },
    removeMedia(state, id: string) {
      state.media = state.media.filter((m) => m.id !== id);
      return state;
    },
    modifyMedia(state, { id, input }: { id: string; input: MediaInput }) {
      state.media = state.media.map((m) =>
        m.id === id ? { ...m, ...input } : m
      );
      return state;
    },
  },
  effects: (dispatch) => ({
    async fetchMedia() {
      const media = await db.media.toArray();
      dispatch.media.setMedia(media);
    },
    async createMedia(input: MediaInput) {
      const media: Media = {
        id: uuid(),
        ...input,
        createdDate: new Date(),
        updatedDate: new Date(),
      };
      await db.media.add(media);
      dispatch.media.addMedia(media);
    },
    async deleteMedia(id: string) {
      await db.media.delete(id);
      dispatch.media.removeMedia(id);
    },
    async editMedia({ id, input }: { id: string; input: MediaInput }) {
      await db.media.update(id, input);
      dispatch.media.modifyMedia({ id, input });
    },
  }),
});
