import axios from "axios";
import qs from "qs";


export function getRegionals(data = null) {

    if (data) {

        const config = {
            method: "POST",
            url: `${process.env.REACT_APP_BACKEND_URL}revision_region`,
            data: qs.stringify(data),
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
        };

        return axios(config);
    }

}

export function getRegionalsBySearch(data = null) {

    if (data) {

        const config = {
            method: "POST",
            url: `${process.env.REACT_APP_BACKEND_URL}busqueda_revision_region`,
            data: qs.stringify(data),
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
        };

        return axios(config);
    }

}

export function postRegionalInformation(data = null) {
    if (data) {

        const config = {
            method: "POST",
            url: `${process.env.REACT_APP_BACKEND_URL}candidato_observacion_regional`,
            data: qs.stringify(data),
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
        };

        return axios(config);
    }
}

export function postRegionalsApproveCandidate(data = null) {

    if (data) {

        const config = {
            method: "POST",
            url: `${process.env.REACT_APP_BACKEND_URL}aprobar_cand_regionales`,
            data: qs.stringify(data),
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
        };

        return axios(config);
    }
}

export function postRegionalsDisapproveCandidate(data = null) {

    if (data) {

        const config = {
            method: "POST",
            url: `${process.env.REACT_APP_BACKEND_URL}desaprobar_cand_regionales`,
            data: qs.stringify(data),
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
        };

        return axios(config);
    }
}