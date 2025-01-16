/** @format */

import moment from "moment";

const useCompactTimeFormat = (time) => {
  const duration = moment.duration(moment().diff(moment(time)));

  const days = duration.days();
  const hours = duration.hours();
  const weeks = Math.floor(duration.asWeeks());
  const years = moment().diff(moment(time), "years"); // Calculate years

  if (years >= 1) {
    return `${years}y`;
  } else if (weeks >= 1) {
    return `${weeks}w`;
  } else if (days >= 1) {
    return `${days}d`;
  } else if (hours >= 1) {
    return `${hours}h`;
  }

  return "Just now";
};

export default useCompactTimeFormat;
