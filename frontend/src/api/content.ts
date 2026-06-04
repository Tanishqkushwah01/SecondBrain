import { api } from "./config";

export interface CreateContentData {
  title: string;
  url: string;
  description: string;
  tag: string;
}

export const createContent = (data: CreateContentData) => {
  return api.post("/auth/link", data);
};

export const deleteContent = (id: string) => {
  return api.delete(`/auth/link/${id}`);
};
