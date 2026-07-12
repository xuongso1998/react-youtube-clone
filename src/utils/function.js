import moment from "moment";
export const convertDate = (data) => {
  return moment(data).fromNow();
};
export const convertDuration = (data) => {
  //chuyển chuỗi ISO thành millisecond
  const millisecond = moment.duration(data).asMilliseconds();
  //từ millisecond format về minute và second
  return moment(millisecond).format("mm:ss");
};
