import { Doctor } from "../types";

const initialState: Doctor | null = null;

const doctorReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "ADD_DOCTOR":
      return action.payload;
    default:
      return state;
  }
};

export default doctorReducer;
