import { Models } from "@rematch/core";
import { CollectionModel } from "./collection";
import { MediaModel } from "./media";
import { TagModel } from "./tags";

export interface RootModel extends Models<RootModel> {
  media: typeof MediaModel;
  tag: typeof TagModel;
  collection: typeof CollectionModel;
}

export const models: RootModel = {
  media: MediaModel,
  tag: TagModel,
  collection: CollectionModel,
};
