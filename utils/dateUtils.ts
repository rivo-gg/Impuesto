export const getMonthName = (date: Date): string => {
  return date.toLocaleString('de-DE', { month: 'long' });
};

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('de-DE');
};

export const calculateBalance = (invoices: Invoice[]): number => {
  return invoices.reduce((total, invoice) => {
    return total + (invoice.type === 'investment' ? invoice.amount : -invoice.amount);
  }, 0);
};

