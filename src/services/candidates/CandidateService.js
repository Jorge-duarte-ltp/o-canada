import axios from "axios";
import qs from "qs";


export function getCandidate(data = null) {

  if (data) {

    const config = {
      method: "POST",
      url: `${process.env.REACT_APP_BACKEND_URL}get_candidato`,
      data: qs.stringify(data),
      headers: { 'content-type': 'application/x-www-form-urlencoded' },

    };

    return axios(config);
  }
}

export function putCandidate(data = null) {
  if (data) {
    const config = {
      method: "PUT",
      url: `${process.env.REACT_APP_BACKEND_URL}update_candidate`,
      data: qs.stringify(data),
      headers: { 'content-type': 'application/x-www-form-urlencoded' },

    };

    return axios(config);
  }
}

export function postCandidateUpdate(data = null) {

  if (data) {

    const config = {
      method: "POST",
      url: `${process.env.REACT_APP_BACKEND_URL}candidato_update`,
      data: qs.stringify(data),
      headers: { 'content-type': 'application/x-www-form-urlencoded' },

    };

    return axios(config);
  }
}

export function postCandidateCreate(data = null) {

  if (data) {

    const config = {
      method: "POST",
      url: `${process.env.REACT_APP_BACKEND_URL}create_candidato`,
      data: qs.stringify(data),
      headers: { 'content-type': 'application/x-www-form-urlencoded' },

    };

    return axios(config);
  }
}

