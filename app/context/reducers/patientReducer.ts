import { Patient } from '../types';

const initialState: Patient[] = [];

const patientReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'ADD_PATIENT':
      return [action.payload];
    default:
      return state;
  }
};
export default patientReducer;