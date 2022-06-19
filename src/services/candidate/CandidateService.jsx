import axios from "axios";

export function putCandidate(data = null) {
  if (data) {
    const config = {
      method: "PUT",
      url: `${process.env.REACT_APP_BACKEND_URL}update_candidate`,
      data: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    return axios(config);
  }
}
