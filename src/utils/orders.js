export function summarizeOrders(orders) {
  return {
    count: orders.length,
    active: orders.filter((order) => order.status !== 'Selesai').length,
    total: orders.reduce((sum, order) => sum + order.price * order.quantity, 0),
  };
}
