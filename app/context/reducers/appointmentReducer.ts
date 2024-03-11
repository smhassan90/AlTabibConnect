import { Appointment } from '../types';

const initialState: Appointment[] = [];

const appointmentReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'ADD_APPOINTMENT':
      return [action.payload];
    default:
      return state;
  }
};
export default appointmentReducer;