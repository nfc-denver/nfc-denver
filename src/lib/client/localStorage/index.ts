export * from "./auth";
export * from "./backup";
export * from "./messages";
export * from "./profile";
export * from "./keys";
export * from "./users";

export const saveToLocalStorage = (key: string, value: string): void => {
  localStorage.setItem(key, value);
};

export const getFromLocalStorage = (key: string): string | null => {
  return localStorage.getItem(key);
};
