exports.convertSecondsToDuration = (totalSeconds) => {
  if (!totalSeconds || isNaN(totalSeconds)) {
    return "0m 0s";
  }

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  let duration = "";
  if (hours > 0) duration += `${hours}h `;
  if (minutes > 0) duration += `${minutes}m `;
  duration += `${seconds}s`;

  return duration.trim();
};