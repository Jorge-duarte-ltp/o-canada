import moment from "moment";

const calculoDiasFechas = (fecha1, fecha2) => {
  const fecha1Temp = moment(fecha1);
  const fecha2Temp = moment(fecha2);
  return parseInt(fecha1Temp.diff(fecha2Temp, "days"));
};

export default calculoDiasFechas;
