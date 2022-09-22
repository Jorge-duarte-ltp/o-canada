import axios from "axios"
import qs from "qs";

export function postUploadFile(data) {
    const config = {
        method: "POST",
        url: `${process.env.REACT_APP_BACKEND_URL}carga_archivo`,
        data: JSON.stringify(data),
        headers: {
            "Content-Type": "multipart/form-data"
        }
    };

    return axios(config);
}
