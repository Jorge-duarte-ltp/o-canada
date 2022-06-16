import axios from "axios"

export function checkFilesExist(data) {
    const config = {
        method: "POST",
        url: `${process.env.REACT_APP_BACKEND_URL}check_files_exist`,
        data: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    };

    return axios(config);
}