import { Clinic } from '../types';

export const addClinic = (clinic: Clinic) => ({
  type: 'ADD_CLINIC' as const,
  payload: clinic,
});