import axios from "axios";

export const fetchUserData = async () => {
  const response = await axios.get("/api/fetch-user-data", {
    withCredentials: true,
  });
  return response.data;
};
