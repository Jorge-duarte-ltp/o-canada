import axios from "axios";

export function getManifest() {
    const config = {
        method: "post",
        url: `${process.env.REACT_APP_BACKEND_URL}exportar_data_manifiesto`,
    };

    return axios(config);
}
