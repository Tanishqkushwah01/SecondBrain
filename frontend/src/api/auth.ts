import { api } from "./config";

export const googleAuth = (code: string) => {
  return api.get(`/auth/google?code=${code}`);
};
