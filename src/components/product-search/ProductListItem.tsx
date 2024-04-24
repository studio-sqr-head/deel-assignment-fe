import { memo } from "react";

import { Product as ProductI } from "../../../types";
import { highlightText } from "../../utils";

export const ProductListItem = memo(
  ({ product, query }: { product: ProductI; query: string }) => {
    const titleParts = highlightText(product.title, query);

    return (
      <div className="search-result">
        <img src={product.thumbnail} alt={product.title} />

        <h3>
          {titleParts.map((part, index) => (
            <span
              key={index}
              className={part.highlight ? "search-result-highlighted" : ""}
            >
              {part.text}
            </span>
          ))}
        </h3>
        <p className="search-result-description">{product.description}</p>
      </div>
    );
  }
);
