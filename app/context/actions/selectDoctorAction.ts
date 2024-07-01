// actions.js
export const SELECT_DOCTOR = "SELECT_DOCTOR";

export const selectDoctor = (doctor: any) => ({
  type: SELECT_DOCTOR,
  payload: doctor,
});
