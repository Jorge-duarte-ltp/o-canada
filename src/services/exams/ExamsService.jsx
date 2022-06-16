import axios from "axios";

export function postExamenOSEP(data = null) {
    if (data) {
        const config = {
            method: "post",
            url: `${process.env.REACT_APP_BACKEND_URL}insert_examen_equipo_aereo`,
            data: data,
            Headers: {
                "Content-Type": "application/json"
            }
        };

        return axios(config);
    }
}


