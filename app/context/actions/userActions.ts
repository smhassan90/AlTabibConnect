import { User }  from "../types";

export const addUser = (User:User) => ({
    type: 'ADD_USER' as const,
    payload: User ,
  });