import axios from "axios";
import qs from "qs";

export function postLogin(data = null) {

    if (data) {

        const config = {
            method: "POST",
            url: `${process.env.REACT_APP_BACKEND_URL}login_user`,
            data: qs.stringify(data),
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
        };

        return axios(config);
    }


}
