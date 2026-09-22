import api from "./api";

export const updateProfileApi = (data) => {
  return api.patch("/profile/edit", data);
};
