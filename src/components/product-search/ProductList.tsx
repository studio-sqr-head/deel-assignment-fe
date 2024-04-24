import { memo } from "react";

import { AllProductsResponse } from "../../../types";
import { ProductListItem } from "./ProductListItem";

export const ProductList = memo(
  ({ data, query }: { data?: AllProductsResponse; query: string }) => {
    return (
      <div className="search-results">
        {data?.products?.map((product) => (
          <ProductListItem key={product.id} product={product} query={query} />
        ))}
      </div>
    );
  }
);
