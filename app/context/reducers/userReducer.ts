import { User } from '../types';

const initialState: User[] = [];

const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'ADD_USER':
      return [action.payload];
    default:
      return state;
  }
};
export default userReducer;