import { Clinic } from '../types';

const initialState: Clinic[] = [];

const clinicReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'ADD_CLINIC':
      return [...state, action.payload];
    default:
      return state;
  }
};

export default clinicReducer;
