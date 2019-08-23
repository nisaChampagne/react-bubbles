import axios from "axios";

function AxiosWithAuth() {
  const token = localStorage.getItem("token");

  return axios.create({
    headers: {
      Authorization: token
    }
  });
}
export default AxiosWithAuth;