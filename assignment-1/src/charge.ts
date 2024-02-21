export type Invoice = {
  total: number;
};

export type Receipt = {
  total: number;
  deposit: number;
  change: number;
};

export type Payment = {
  type: string;
  percentage?: number;
  amount?: number;
};

export const charge = (invoice: Invoice, payments: Payment[]) => {
  const total = invoice.total;
  let deposit = 0;
  let isCoupon = false;

  payments
    .sort((payment) => (payment.type !== 'CASH' ? -1 : 1))
    .map((payment) => {
      if (payment.type === 'COUPON') {
        isCoupon = true;
        if (payment.percentage !== undefined) {
          deposit += Math.floor(total * (payment.percentage / 100));
        } else {
          deposit += payment.amount || 0;
        }
      } else {
        if (deposit >= total) {
          throw new Error('OverCharge');
        }
        deposit += payment.amount || 0;
        isCoupon = false;
      }
    });
  if (total > deposit) {
    throw new Error('Shortage');
  }

  return { total, deposit, change: isCoupon ? 0 : deposit - total };
};
