import { authKey } from "@/constants/storageKey";
import { decodedToken } from "@/utils/jwt";
import { getFromLocalStorage, setToLocalStorage } from "@/utils/local-storage";

export const storeUserInfo = ({ accessToken }: { accessToken: string }) => {
  return setToLocalStorage(authKey, accessToken);
};

export const getUserInfo = () => {
  if (typeof window !== 'undefined') {
    const authToken = getFromLocalStorage(authKey);
    if (authToken) {
      const decodedData = decodedToken(authToken);
      return decodedData;
    }
  }
  return "";
};


export const getToken = () => {
  const authToken = getFromLocalStorage(authKey);
  if(authToken){
    return authToken
  }else{
    return ""
  }
}

export const isLoggedin = () => {
  const authToken = getFromLocalStorage(authKey);
  return !!authToken;
};

export const removeUserInfo = (key: string) => {
  return localStorage.removeItem(key);
};
