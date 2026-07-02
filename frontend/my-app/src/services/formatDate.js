export const formatDate = (date) => {
  if (!date) return "N/A";

  const d = new Date(date);

  if (isNaN(d.getTime())) return "N/A";

  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = d.toLocaleDateString("en-US", options);

  const hour = d.getHours();
  const minutes = d.getMinutes();
  const period = hour >= 12 ? "PM" : "AM";
  const formattedHour = (hour % 12 || 12).toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedTime = `${formattedHour}:${formattedMinutes} ${period}`;

  return `${formattedDate} | ${formattedTime}`;
};