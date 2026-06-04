import { api } from "./config";

export const shareContent = () => {
  return api.post("/auth/share");
};

export const getSharedDashboard = (hash: string) => {
  return api.get(`/share/${hash}`);
};
