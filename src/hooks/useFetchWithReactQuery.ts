import {
  UseQueryOptions,
  UseQueryResult,
  useQuery,
} from '@tanstack/react-query';
import { RequestInit } from 'next/dist/server/web/spec-extension/request';

async function fetcher<TData>(
  url: string,
  options?: RequestInit,
): Promise<TData> {
  const response = await fetch(url, options);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return response.json();
}

export function useFetchWithReactQuery<TData>(
  url: string,
  fetchOptions?: RequestInit,
  queryOptions?: UseQueryOptions<TData, Error>,
): UseQueryResult<TData, Error> {
  return useQuery<TData, Error>(
    ['data', url],
    () => fetcher(url, fetchOptions),
    {
      staleTime: 24 * 60 * 60 * 1000, // 24 hours
      retry: 3,
      cacheTime: 30 * 60 * 1000, // 30 minutes
      ...queryOptions,
    },
  );
}
