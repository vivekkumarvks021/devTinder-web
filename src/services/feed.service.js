import api from "./api";

export const getFeed = () => {
  return api.get("/users/feed");
};
