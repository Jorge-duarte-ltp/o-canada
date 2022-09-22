import axios from "axios";
import qs from "qs";

export function postAvalibles(data = null) {
    if (data) {
        const config = {
            method: "post",
            url: `${process.env.REACT_APP_BACKEND_URL}disponible_candidatos`,
            data: qs.stringify(data),
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
        }

        return axios(config);
    }
} 

export function postAvaliblesStatusCandidate(data = null) {
    if (data) {
        const config = {
            method: "post",
            url: `${process.env.REACT_APP_BACKEND_URL}asignarDisponibilidadCandidato`,
            data: qs.stringify(data),
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
        }

        return axios(config);
    }
}