import axiosClient from "../config/axios";

export async function obtenerFotografia(curp,fotografia) {
  const url_poto = `${process.env.REACT_APP_DOCS_URL}${curp}/${fotografia}`;
  var config = {
    method: "get",
    url: url_poto,
    headers: {
      "Content-Type": "image/png, image/jpeg",
    },
  };

  return axiosClient(config);
}
