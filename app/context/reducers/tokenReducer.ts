import { Token } from '../types';

const initialState: Token[] = [];

const appointmentReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'ADD_TOKEN':
      return [action.payload];
    default:
      return state;
  }
};
export default appointmentReducer;