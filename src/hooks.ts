import { useState, useEffect, useCallback } from "react";

import { AllProductsResponse, ApiResponseStatus } from "../types";

const GET_ALL_PRODUCTS_BY_QUERY = "https://dummyjson.com/products/search";

export const useGetAllProductsByQuery = ({ name }: { name: string }) => {
  const [data, setData] = useState<AllProductsResponse>();
  const [error, setError] = useState<Error | null>(null);
  const [status, setStatus] = useState<ApiResponseStatus>("idle");

  const getAllCountriesByName = useCallback(async () => {
    if (!name) {
      return;
    }
    try {
      setStatus("loading");
      const response = await fetch(`${GET_ALL_PRODUCTS_BY_QUERY}?q=${name}`);
      const data = await response.json();
      setData(data);
      setStatus("success");
    } catch (error) {
      setError(error as Error);
      setStatus("isError");
    }
  }, [name]);

  useEffect(() => {
    getAllCountriesByName();
  }, [getAllCountriesByName, name]);

  return { data, error, status };
};
