import { createModel } from "@rematch/core";
import { RootModel } from "./models";

export const testModel = createModel<RootModel>()({
  state: {
    message: "",
  },
  reducers: {
    setMessage: (state, message: string) => {
      state.message = message;
      return state;
    },
    hello: (state) => {
      state.message = "Hello World";
      return state;
    },
  },
  effects: (dispatch) => ({
    slowlyHello: () => {
      return new Promise((r) =>
        setTimeout(() => {
          dispatch.test.hello();
          r(undefined);
        }, 1000)
      );
    },
  }),
});
