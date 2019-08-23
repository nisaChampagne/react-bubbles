import axios from "axios";

function AxiosWithAuth() {
  const token = localStorage.getItem("token");///getting token and saving to local storage

  return axios.create({
    headers: {
      Authorization: token
    }
  });
}
export default AxiosWithAuth;