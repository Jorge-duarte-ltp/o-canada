import dayjs from "dayjs";

const isClose = () => {

  const start_date = process.env.REACT_APP_F1_START_DATE;
  const end_date = process.env.REACT_APP_F1_END_DATE;

  const isAfter = dayjs(start_date).isBefore();
  const isBefore = dayjs().isAfter(end_date);

  if (isAfter && !isBefore) {
    return false;
  }

  return true;
};

export default isClose;
