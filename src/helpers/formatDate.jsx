export const formatDate = (date, addyears) => {
  console.log(date);
  let dateTemp = new Date(date),
    month = "" + (dateTemp.getUTCMonth()+1),
    day = "" + dateTemp.getUTCDate(),
    year = dateTemp.getFullYear() + addyears;

    console.log('month:' + month + 'day:' + day+ 'year:' + year);
  if (month.length < 2) {
    month = "0" + month;
  }
  if (day.length < 2) {
    day = "0" + day;
  }

  return [year, month, day].join("-");
};
