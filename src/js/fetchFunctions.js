export const refreshHistory = async () => {
  return new Promise(async (resolve, reject) => {
    const response = await fetch("http://localhost:3000/api/order/add", {
      method: "post",
    });
    if (response.ok) {
      resolve(response);
    } else {
      reject(response);
    }
  });
};

export const getHistory = async () => {
  let orderHistory = {};
  return new Promise(async (resolve, reject) => {
    const response = await fetch("http://localhost:3000/api/order/");

    if (response.ok) {
      orderHistory = await response.json();
      await orderHistory.orders.forEach((order) => {
        const date = new Date(order.time);
        const options = {
          year: "numeric",
          month: "short",
          day: "numeric",
        };
        order.date = date.toLocaleDateString("fr-FR", options);
      });
      resolve(orderHistory.orders);
    } else {
      reject(response.json());
    }
  });
};

export const getFuturesAccount = async () => {
  return new Promise(async (resolve, reject) => {
    const response = await fetch("http://localhost:3000/api/account/");
    if (response.ok) {
      resolve(await response.json());
    } else {
      reject(await response.json());
    }
  });
};

export default {
  refreshHistory,
  getHistory,
  getFuturesAccount,
};
