import { Token }  from "../types";

export const addToken = (Token:Token) => ({
    type: 'ADD_TOKEN' as const,
    payload: Token ,
  });