import axios from "axios"

export function postUploadFile(data) {
    const config = {
        method: "POST",
        url: `${process.env.REACT_APP_BACKEND_URL}cargar_archivo`,
        data: data,
        headers: {
            "Content-Type": "multipart/form-data"
        }
    };

    return axios(config);
}
