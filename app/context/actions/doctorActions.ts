import { Doctor } from '../types';

export const addDoctor = (doctor: Doctor) => ({
  type: 'ADD_DOCTOR' as const,
  payload: doctor,
});
