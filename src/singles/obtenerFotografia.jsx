import axiosClient from "../config/axios";

export async function obtenerFotografia(curp, fotografia) {
  var config = {
    method: "get",
    url: `${process.env.REACT_APP_BACKEN_URL}get_photo_candidato?curp=${curp}&filename=${fotografia}`,
  };
  return axiosClient(config);
}
