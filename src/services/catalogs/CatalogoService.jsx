import axios from "axios";
import qs from "qs";

export function ObtenerEstados() {
  const config = {
    method: "post",
    url: `${process.env.REACT_APP_BACKEND_URL}list_estados`,
  };

  return axios(config);
}

export function ObtenerAeropuertos() {
  const config = {
    method: "post",
    url: `${process.env.REACT_APP_BACKEND_URL}list_aeropuertos`,
  };

  return axios(config);
}

export function ObtenerMunicipios(cve_entidad) {
  if (cve_entidad) {
    const config = {
      method: "POST",
      url: `${process.env.REACT_APP_BACKEND_URL}obtener_municipios_entidad`,
      data: qs.stringify({ clave_entidad: cve_entidad }),
      headers: { "content-type": "application/x-www-form-urlencoded" },
    };

    return axios(config);
  }
}

export function ObtenerEquipo() {
  const config = {
    method: "post",
    url: `${process.env.REACT_APP_BACKEND_URL}list_equipo`,
  };

  return axios(config);
}

export function ObtenerVacunas() {
  const config = {
    method: "post",
    url: `${process.env.REACT_APP_BACKEND_URL}list_vacunas`,
  };

  return axios(config);
}

export function ObtenerPaises() {
  const config = {
    method: "post",
    url: `${process.env.REACT_APP_BACKEND_URL}list_paises`,
  };

  return axios(config);
}

export function ObtenerAniosByPaisId(id = null) {
  if (id) {
    const config = {
      method: "POST",
      url: `${process.env.REACT_APP_BACKEND_URL}list_paises_anios`,
      data: qs.stringify({ id }),
      headers: { "content-type": "application/x-www-form-urlencoded" },
    };

    return axios(config);
  }
}

export function ObtenerPosiciones() {
  const config = {
    method: "post",
    url: `${process.env.REACT_APP_BACKEND_URL}list_posiciones`,
  };

  return axios(config);
}

export function ObtenerProvincias() {
  const config = {
    method: "post",
    url: `${process.env.REACT_APP_BACKEND_URL}list_provincias`,
  };

  return axios(config);
}
