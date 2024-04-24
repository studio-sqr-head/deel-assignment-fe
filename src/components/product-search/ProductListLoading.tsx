import { ProductListLoadingItem } from "./ProductListLoadingItem";

export const ProductListLoading = ({ count }: { count: number }) => {
  return (
    <div className="search-results">
      {[...Array(count ?? 3)].map((_, index) => (
        <ProductListLoadingItem key={index} />
      ))}
    </div>
  );
};
