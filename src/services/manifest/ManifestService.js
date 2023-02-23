import axios from "axios";
import qs from "qs";


export function postBrigadesCandidates(data = null) {

    if (data) {

        const config = {
            method: "POST",
            url: `${process.env.REACT_APP_BACKEND_URL}brigada_candidatos`,
            data: qs.stringify(data),
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
        };

        return axios(config);
    }
}

export function postBrigadesCandidatesById(data = null) {

    if (data) {

        const config = {
            method: "post",
            url: `${process.env.REACT_APP_BACKEND_URL}selectCandidatoBrigada`,
            data: qs.stringify(data),
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
        };

        return axios(config);
    }
}

export function postBrigadesCandidatesInsert(data = null) {
    
    if (data) {
        const config = {
            method: "post",
            url: `${process.env.REACT_APP_BACKEND_URL}insertCandidatoBrigada`,
            data: qs.stringify(data),
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
        };

        return axios(config);
    }
}

export function postBrigadesCandidatesUpdate(data = null) {

    if (data) {

        const config = {
            method: "post",
            url: `${process.env.REACT_APP_BACKEND_URL}updateCandidatoBrigada`,
            data: qs.stringify(data),
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
        };

        return axios(config);
    }
}

