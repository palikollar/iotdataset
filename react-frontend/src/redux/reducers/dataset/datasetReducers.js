import {
  SET_DATASET_SELECT,
  SET_DATASET,
  SET_SELECTED_DATASET,
  SET_DATASET_NULL
} from "../../actions/types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_DATASET:
      return {
        ...state,
        dataset: action.payload
      };
    case SET_DATASET_SELECT:
      return {
        ...state,
        select: action.payload
      };
    case SET_SELECTED_DATASET:
      return {
        ...state,
        selected: action.payload
      };
    case SET_DATASET_NULL:
      return null;
    default:
      return { ...state };
  }
}
