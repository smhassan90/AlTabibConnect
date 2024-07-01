import { combineReducers } from "redux";
import doctorReducer from "./doctorReducer";
import clinicReducer from "./clinicReducer";
import appointmentReducer from "./appointmentReducer";
import tokenReducer from "./tokenReducer";
import userReducer from "./userReducer";
import patientReducer from "./patientReducer";
import selectedDoctor from "./selectedDoctor";

const rootReducer = combineReducers({
  doctors: doctorReducer,
  clinics: clinicReducer,
  appointments: appointmentReducer,
  tokens: tokenReducer,
  users: userReducer,
  patients: patientReducer,
  selectedDoctor: selectedDoctor,
});

export default rootReducer;
