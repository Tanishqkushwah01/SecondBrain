import { api } from "./config";

export const getContentByTag = (tag: string) => {
  return api.get(`/auth/tag/${tag}`);
};
