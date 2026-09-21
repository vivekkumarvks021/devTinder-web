import api from "./api";

export const sendConnectionRequest = (status, userId) => {
  return api.post(`/requests/send/${status}/${userId}`);
};
