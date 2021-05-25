export const formatDate = (date, addyears) => {
 
  let dateTemp = new Date(date),
    month = "" + (dateTemp.getUTCMonth()+1),
    day = "" + dateTemp.getUTCDate(),
    year = dateTemp.getFullYear() + addyears;
    
  if (month.length < 2) {
    month = "0" + month;
  }
  if (day.length < 2) {
    day = "0" + day;
  }

  return [year, month, day].join("-");
};
