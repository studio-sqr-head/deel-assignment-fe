import React from "react";

export const ProductSearchInput = ({
  setQuery,
  query,
}: {
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  query: string;
}) => {
  return (
    <input
      type="text"
      className="search-bar"
      placeholder="Search for a product by name..."
      onChange={(e) => setQuery(e.target.value)}
      value={query}
    />
  );
};
