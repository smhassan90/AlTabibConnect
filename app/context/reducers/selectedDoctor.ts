// reducers.js
import { SELECT_DOCTOR } from "../actions/selectDoctorAction";

const initialState = {
  selectedDoctor: null,
};

const selectedDoctor = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_DOCTOR:
      return {
        ...state,
        selectedDoctor: action.payload,
      };
    default:
      return state;
  }
};

export default selectedDoctor;
