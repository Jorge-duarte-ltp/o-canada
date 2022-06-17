import axios from "axios";

export function postExamen(data = null) {
    if (data) {
        const config = {
            method: "post",
            url: `${process.env.REACT_APP_BACKEND_URL}insert_examen`,
            data: data,
            Headers: {
                "Content-Type": "application/json"
            }
        };

        return axios(config);
    }
}


