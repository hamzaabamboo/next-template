import { createModel } from "@rematch/core";
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
  }),
});
