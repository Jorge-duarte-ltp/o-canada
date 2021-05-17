import axiosClient from "../config/axios";

export default function obtenerEstados() {
  const config = {
    method: "post",
    url: `${process.env.REACT_APP_BACKEN_URL}list_estados`,
  };

  return axiosClient(config);
}
