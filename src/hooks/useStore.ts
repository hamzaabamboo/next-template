import { useSelector } from "react-redux";
import { RootState } from "../state";

export const useStore = <Store = RootState, Selected = unknown>(
  selector: (store: Store) => Selected,
  equalityFn?: (left: Selected, right: Selected) => boolean
) => useSelector<Store, Selected>(selector, equalityFn);
