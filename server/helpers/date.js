const formattedTime = (dateObject) => {
  let hours = dateObject.getHours();
  let minutes = dateObject.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours %= 12;
  hours = hours || 12;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedTimeString = `${hours}:${minutes}${ampm}`;
  return formattedTimeString;
};

const formattedDate = (dateObject) => {
  return new Date(dateObject.getFullYear(), dateObject.getMonth(), dateObject.getDate()).toDateString();
};

const formattedDateTime = dateObject => `${formattedTime(dateObject)} - ${formattedDate(dateObject)}`;

export default { formattedTime, formattedDate, formattedDateTime };
