import axiosClient from "../config/axios";

export async function ObtenerFotografia(curp, fotografia) {
  var config = {
    method: "get",
    url: `${process.env.REACT_APP_BACKEND_URL}get_photo_candidato?curp=${curp}&filename=${fotografia}`,
  };
  return axiosClient(config);
}
