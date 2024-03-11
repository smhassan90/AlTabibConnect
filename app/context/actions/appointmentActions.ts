export const addAppointment = (doc:Doctor, clinic: Clinic) => ({
  type: 'ADD_APPOINTMENT' as const,
  payload: { doc, clinic },
});
import { Doctor, Clinic } from '../types';
