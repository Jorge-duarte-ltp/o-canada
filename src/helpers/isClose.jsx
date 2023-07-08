import dayjs from "dayjs";
const isClose = () => dayjs().isAfter(dayjs(process.env.REACT_APP_CLOSE_F1));

export default isClose;
