import * as SecureStore from 'expo-secure-store';
import { useState } from 'react';

export const tokenCache = {
    async getToken(key:string){
        try{
            return await SecureStore.getItemAsync(key);
        }
        catch(e){
            console.log("TOKEN CACHE GET ERROR: ",e);
        }   
    },
    async setToken(key:string,value:string){
        try{
            return await SecureStore.setItemAsync(key,value);
        }
        catch(e){
            console.log("TOKEN CACHE SET ERROR: ",e);
        }
    },
    async deleteToken(key:string){
        try{
            return await SecureStore.deleteItemAsync(key);
        }
        catch(e){
            console.log("TOKEN CACHE DELETE ERROR: ",e);
        }
    }

}