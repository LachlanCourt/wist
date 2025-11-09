export const useLocalStorage = () => {
  const setValue = (key: string, value: string) => {
    window.localStorage.setItem(key, value);
  };

  const getValue = (key: string) => {
    const value = window.localStorage.getItem(key);
    return value ?? "";
  };

  return { setValue, getValue };
};
