import { defineStore } from "pinia";

export const useOrderTradeStore = defineStore("orderTrade", {
  state: () => ({
    dayGain: 0,
    weekGain: 0,
    monthGain: 0,
    allGain: 0,
    saveHistory: {},
    historyOrders: {},
  }),
  actions: {
    setWallet() {},
    setHistoryOrders(orders) {
      this.historyOrders = orders;
      this.saveHistory = orders;
      this.calculateDayGain();
      this.calculateWeekGain();
      this.calculateMonthGain();
      this.calculateAllGain();
    },
    calculateAllGain() {
      this.saveHistory.forEach((order) => {
        this.allGain = this.allGain + (order.realizedPnl + -order.commission);
      });
    },
    calculateMonthGain() {
      const currentDate = new Date().getTime();

      const monthHistory = this.saveHistory.filter(
        (key) =>
          new Date(key.time).getMonth() === new Date(currentDate).getMonth()
      );
      monthHistory.forEach((order) => {
        this.monthGain =
          this.monthGain + (order.realizedPnl + -order.commission);
      });
    },
    calculateWeekGain() {
      const offset = (new Date().getDay() + 6) % 7;
      const weekDay = new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate() - offset
      );

      const weekHistory = this.saveHistory.filter(
        (key) => key.time >= weekDay.getTime()
      );

      weekHistory.forEach((order) => {
        this.weekGain = this.weekGain + (order.realizedPnl + -order.commission);
      });
    },
    calculateDayGain() {
      const currentDate = new Date().getTime();
      const dayHistory = this.saveHistory.filter(
        (key) =>
          new Date(key.time).toDateString() ===
          new Date(currentDate).toDateString()
      );
      dayHistory.forEach((order) => {
        this.dayGain = this.dayGain + (order.realizedPnl + -order.commission);
      });
    },
    sortByDate(orders) {
      orders.sort((a, b) => {
        return b.time - a.time;
      });
    },
    filterOrder(filter) {
      const currentDate = new Date().getTime();
      switch (filter) {
        case "1":
          this.historyOrders = this.saveHistory.filter(
            (key) =>
              new Date(key.time).toDateString() ===
              new Date(currentDate).toDateString()
          );
          break;
        case "7":
          const weekDay = new Date(currentDate - 604_800_000).getTime();
          this.historyOrders = this.saveHistory.filter(
            (key) => key.time >= weekDay
          );
          break;
        case "1m":
          this.historyOrders = this.saveHistory.filter(
            (key) =>
              new Date(key.time).getMonth() === new Date(currentDate).getMonth()
          );
          break;
        case "all":
          this.historyOrders = this.saveHistory;
      }
    },
  },
});
