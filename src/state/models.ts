import { Models } from "@rematch/core";
import { testModel } from "./test";

export interface RootModel extends Models<RootModel> {
  test: typeof testModel;
}

export const models: RootModel = { test: testModel };
