import React, { useState } from "react";
import axiosClient from "../config/axios";
import { isEmpty } from "lodash";
export const CheckListEquipo = (props) => {
  const { state, setState } = props;
  const [data, setData] = useState([]);
  const [checkSelected, setCheckSelected] = useState(
    state.equipo_proteccion ? state.equipo_proteccion : {}
  );
  const config = {
    method: "post",
    url: `${process.env.REACT_APP_BACKEN_URL}list_equipo`,
  };

  if (isEmpty(data)) {
    axiosClient(config).then(async (response) => {
      const data = await response.data.data;
      setData(data);
    });
  }

  const setInfo = (input, id) => {
    if (input.target.checked) {
      setCheckSelected({
        ...checkSelected,
        ["id"+id]: {
          id: id,
          [input.target.name]: input.target.checked,
        },
      });
    } else {
      setCheckSelected({
        ...checkSelected,
        ["id"+id]: {
          id: id,
          [input.target.name]: input.target.checked,
        },
      });
    }
    setState({ ...state, equipo_proteccion: checkSelected });
  };

  return (
    <div>
      {!isEmpty(data) &&
        data.map((item) => (
          <div className="form-check" key={item.id}>
            <input
              className="form-check-input"
              type="checkbox"
              name={`check${item.id}`}
              value={`${checkSelected}.id${item.id}.check${item.id}`}
              onClick={(e) => setInfo(e,item.id)}
            />
            <label className="form-check-label">
              <strong>{item.nombre}</strong>({item.descripcion})
            </label>
          </div>
        ))}
    </div>
  );
};
