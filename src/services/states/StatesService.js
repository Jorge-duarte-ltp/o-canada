import axios from "axios";
import qs from "qs";


export function getStates(data = null) {

    if (data) {

        const config = {
            method: "POST",
            url: `${process.env.REACT_APP_BACKEND_URL}revision_estatal`,
            data: qs.stringify(data),
            headers: { 'content-type': 'application/x-www-form-urlencoded' },

        }

        return axios(config);
    }
}


export function getStatesBySearch(data = null) {

    if (data) {

        const config = {
            method: "POST",
            url: `${process.env.REACT_APP_BACKEND_URL}busqueda_revision_estatal`,
            data: qs.stringify(data),
            headers: { 'content-type': 'application/x-www-form-urlencoded' },

        }

        return axios(config);
    }
}

export function postStatesEvaluation(data = null) {

    if (data) {

        const config = {
            method: "POST",
            url: `${process.env.REACT_APP_BACKEND_URL}pruebas_fisicas`,
            data: qs.stringify(data),
            headers: { 'content-type': 'application/x-www-form-urlencoded' },

        }

        return axios(config);
    }
}