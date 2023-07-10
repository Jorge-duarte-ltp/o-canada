import dayjs from "dayjs";

const isClose = () => {

  const start_date = "2023-07-11 09:00:00";
  const end_date = "2023-07-11 11:00:00";

  const isAfter = dayjs(start_date).isBefore();
  const isBefore = dayjs().isAfter(end_date);

  if (isAfter && !isBefore) {
    return false;
  }

  return true;
};

export default isClose;
