export const extractIdFromUrl = (url) => {
  const match = url.match(/\/people\/(\d+)\//);
  return match ? match[1] : null;
};
