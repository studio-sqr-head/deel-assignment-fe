export const highlightText = (text: string, query: string) => {
  const parts = text.split(new RegExp(`(${query})`, "gi"));

  return parts.map((part) => ({
    text: part,
    highlight: part.toLowerCase() === query.toLowerCase(),
  }));
};
