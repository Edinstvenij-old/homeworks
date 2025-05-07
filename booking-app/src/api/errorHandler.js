export const handleError = (error, fallbackMessage = "Unexpected API error") => {
  const status = error?.response?.status;
  const message =
    error?.response?.data?.message || error?.message || fallbackMessage;

  console.error(`API Error${status ? ` (${status})` : ""}: ${message}`);
  throw new Error(message);
};
