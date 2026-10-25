import { useMemo } from 'react';
import useFetch from './useFetch.js';
import { summarizeOrders } from '../utils/orders.js';

export default function useOrders(token) {
  const { data, loading, error } = useFetch('/orders', token);
  const orders = useMemo(() => data || [], [data]);
  const summary = useMemo(() => summarizeOrders(orders), [orders]);
  return { orders, summary, loading, error };
}
