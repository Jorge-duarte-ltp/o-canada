import moment from "moment";

const validarFechas = (fecha1, fecha2) => {
  let fecha1Temp = moment(fecha1);
  let fecha2Temp = moment(fecha2);
  const diferencia = parseInt(fecha1Temp.diff(fecha2Temp, "days"));
  if (diferencia < 0) {
    return true;
  } else {
    return false;
  }
};

export default validarFechas;
