import axios from "axios";
import qs from "qs";

export function postBrigades(data = null) {

    if (data) {

        const config = {
            method: "post",
            url: `${process.env.REACT_APP_BACKEND_URL}brigadistas_evaluacion`,
            data: qs.stringify(data),
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
        };

        return axios(config);
    }

}


export function postBrigadesEvaluation(data = null) {
    if (data) {

        const config = {
            method: "post",
            url: `${process.env.REACT_APP_BACKEND_URL}create_evaluacion`,
            data: qs.stringify(data),
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
        };

        return axios(config);
    }
}

export function putBrigadesEvaluation(data = null) {
    if (data) {

        const config = {
            method: "put",
            url: `${process.env.REACT_APP_BACKEND_URL}edit_evaluacion`,
            data: qs.stringify(data),
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
        };

        return axios(config);
    }
}