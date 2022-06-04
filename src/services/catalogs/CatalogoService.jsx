import axios from "axios";

export function ObtenerEstados() {

    const config = {
        method: "post",
        url: `${process.env.REACT_APP_BACKEN_URL}list_estados`,
    };

    return axios(config);
}


export function ObtenerAeropuertos() {
    const config = {
        method: "post",
        url: `${process.env.REACT_APP_BACKEN_URL}list_aeropuertos`,
    };

    return axios(config);
}


export function ObtenerMunicipios(cve_entidad) {

    if (cve_entidad) {

        const config = {
            method: "POST",
            url: `${process.env.REACT_APP_BACKEN_URL}obtener_municipios_entidad`,
            data: JSON.stringify({ clave_entidad: cve_entidad }),
            headers: { 'Content-Type': 'application/json' }
        };

        return axios(config);
    }
}

export function ObtenerEquipo() {

    const config = {
        method: "post",
        url: `${process.env.REACT_APP_BACKEN_URL}list_equipo`,
    };

    return axios(config);
}


export function ObtenerVacunas() {

    const config = {
        method: "post",
        url: `${process.env.REACT_APP_BACKEN_URL}list_vacunas`,
    };

    return axios(config);
}
