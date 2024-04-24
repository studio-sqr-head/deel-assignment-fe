import { useState } from "react";

import { useGetAllProductsByQuery } from "../../hooks";
import { ProductList } from "./ProductList";
import { ProductListEmpty } from "./ProductListEmpty";
import { ProductListError } from "./ProductListError";
import { ProductListLoading } from "./ProductListLoading";
import { ProductSearchInput } from "./ProductSearchInput";

export const ProductSearch = () => {
  const [query, setQuery] = useState<string>("");

  const { data, error, status } = useGetAllProductsByQuery({
    name: query,
  });

  return (
    <div className="product-search-container">
      <ProductSearchInput setQuery={setQuery} query={query} />
      {query != null && query.length > 0 && (
        <div className="search-results-container">
          {status === "loading" ? (
            <ProductListLoading count={3} />
          ) : status === "isError" ? (
            <ProductListError errorMessage={error?.message} />
          ) : status === "success" && data?.products.length === 0 ? (
            <ProductListEmpty />
          ) : (
            <ProductList data={data} query={query} />
          )}
        </div>
      )}
    </div>
  );
};
