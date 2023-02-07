export const isValidUSZip = (sZip) => {
  return /^\d{5}(-\d{4})?$/.test(sZip);
};
