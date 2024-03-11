import { Doctor } from '../types';

const initialState: Doctor[] = [];

const doctorReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'ADD_DOCTOR':
      return [...state, action.payload];
    default:
      return state;
  }
};

export default doctorReducer;
