import { useCallback, useEffect, useState, useTransition } from "react";
import { useApiEndpoints } from "../useApiEndpoints/useApiEndpoints";

export enum QueryType {
  GET,
  POST
}

type ErrorType = { message?: string };

interface UseQueryProps<T> {
  query: string;
  type: QueryType;
  body?: string | null;
  queryOnInit?: boolean;
  onSuccess?: (data: T) => void;
  onError?: (error: ErrorType) => void;
  postProcess?: (data: T) => T;
}

export const useQuery = <T>({
  query,
  type,
  body = null,
  queryOnInit = type === QueryType.GET,
  onSuccess,
  onError,
  postProcess = (data) => data
}: UseQueryProps<T>) => {
  const endpoint = useApiEndpoints();

  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFailed, setIsFailed] = useState(false);

  const handleFetch = useCallback(() => {
    fetch(`${endpoint}/${query}`, {
      method: QueryType[type],
      body,
      headers: { "Content-Type": "application/json" },
      credentials: "include"
    }).then((response) => {
      if (response.status !== 200) {
        setIsFailed(true);
        if (onError) onError({});
        return;
      }

      response.json().then((result) => {
        if (result.success === false && onError)
          onError({ message: result.message });
        const processResult = postProcess(result);
        setData(processResult);
        setIsLoading(false);
        if (onSuccess) onSuccess(processResult);
      });
    });
  }, [query, endpoint, type, body]);

  useEffect(() => {
    if (queryOnInit) handleFetch();
  }, [handleFetch]);

  return { data, isLoading, isFailed, fetch: handleFetch };
};
