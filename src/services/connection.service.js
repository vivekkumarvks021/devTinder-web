import api from "./api";

export const sendConnectionRequest = (status, userId) => {
  return api.post(`/requests/send/${status}/${userId}`);
};

export const getReceivedRequests = () => {
  return api.get("/users/requests/received");
};

export const reviewConnectionRequest = (status, requestId) => {
  return api.post(`/requests/review/${status}/${requestId}`);
};
