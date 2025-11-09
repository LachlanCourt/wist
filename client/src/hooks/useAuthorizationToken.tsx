import { LocalStorageKeys } from "../constants/constants";
import { useLocalStorage } from "./useLocalStorage";

type AuthorizationTokenData = {
  gameCode: string;
  userId: string;
  userName: string;
};

export const useAuthorizationToken = () => {
  const { setValue, getValue } = useLocalStorage();

  const decodeToken = (responseData: {
    token: string;
  }): AuthorizationTokenData => {
    const token = responseData.token;
    const encodedGameData = token.split(".")[1];
    const tokenData = JSON.parse(atob(encodedGameData));

    return {
      gameCode: tokenData.gameCode,
      userId: tokenData.nameid,
      userName: tokenData.unique_name
    };
  };

  const saveTokenData = (gameData: AuthorizationTokenData) => {
    setValue(LocalStorageKeys.GameCode, gameData.gameCode);
    setValue(LocalStorageKeys.UserId, gameData.userId);
    setValue(LocalStorageKeys.UserName, gameData.userName);
  };
  const loadTokenData = (): AuthorizationTokenData => {
    const gameCode = getValue(LocalStorageKeys.GameCode);
    const userId = getValue(LocalStorageKeys.UserId);
    const userName = getValue(LocalStorageKeys.UserName);
    return { gameCode, userId, userName };
  };

  const decodeAndSaveToken = (responseData: { token: string }) => {
    const decodedToken = decodeToken(responseData);
    saveTokenData(decodedToken);
    return decodedToken;
  };
  return { decodeToken, saveTokenData, loadTokenData, decodeAndSaveToken };
};
