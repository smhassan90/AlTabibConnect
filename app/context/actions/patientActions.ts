import { Patient }  from "../types";

export const addPatient = (Patient:Patient) => ({
    type: 'ADD_PATIENT' as const,
    payload: Patient ,
  });