const getDate = function () {
  const today = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  const day = today.toLocaleDateString("en-US", options);
  return day;
};

module.exports = getDate;
