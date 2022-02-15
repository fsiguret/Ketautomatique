import { defineStore } from "pinia";

export const useOrderTradeStore = defineStore("orderTrade", {
  state: () => ({
    dayGain: 0,
    weekGain: 0,
    monthGain: 0,
    allGain: 0,
    historyGain: new Set(),
    saveHistory: {},
    historyOrders: {},
    monthsGains: {
      0: 0,
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
      9: 0,
      10: 0,
      11: 0,
    },
    weeksGains: {},
    daysGains: {},
    yearGains: 0,
    monthHistory: true,
    weekHistory: false,
    dayHistory: false,
  }),
  actions: {
    setHistoryOrders(orders) {
      this.historyOrders = orders;
      this.saveHistory = orders;
      this.calculateDayGain();
      this.calculateWeekGain();
      this.calculateMonthGain();
      this.calculateAllGain();
    },
    setGainHistory() {
      this.saveHistory.forEach((order) => {
        if (
          new Date(order.time).getFullYear() ===
          new Date(Date.now()).getFullYear()
        ) {
          this.historyGain.add(order);
        }
      });
    },
    gainPerYear() {
      this.historyGain.forEach((order) => {
        this.yearGains += order.realizedPnl + -order.commission;
      });
    },
    gainPerMonth() {
      this.historyGain.forEach((order) => {
        const monthOrder = new Date(order.time).getMonth();
        this.monthsGains[monthOrder] += order.realizedPnl + -order.commission;
      });
    },
    gainPerWeek() {
      this.historyGain.forEach((order) => {
        const currentDate = new Date(order.time);
        const startYear = new Date(currentDate.getFullYear(), 0, 1);
        const numberOfDays = Math.floor(
          (currentDate - startYear) / (24 * 60 * 60 * 1000)
        );
        const currentWeek = Math.ceil(
          (currentDate.getDay() + 1 + numberOfDays) / 7
        );
        if (this.weeksGains[currentWeek]) {
          this.weeksGains[currentWeek] += order.realizedPnl + -order.commission;
        } else {
          this.weeksGains[currentWeek] = order.realizedPnl + -order.commission;
        }
      });
    },
    gainPerDay() {
      this.historyGain.forEach((order) => {
        if (this.daysGains[order.date]) {
          this.daysGains[order.date] += order.realizedPnl + -order.commission;
        } else {
          this.daysGains[order.date] = order.realizedPnl + -order.commission;
        }
      });
    },
    calculateAllGain() {
      this.saveHistory.forEach((order) => {
        this.allGain += order.realizedPnl + -order.commission;
      });
    },
    calculateMonthGain() {
      const currentDate = new Date().getTime();

      const monthHistory = this.saveHistory.filter(
        (key) =>
          new Date(key.time).getMonth() === new Date(currentDate).getMonth()
      );
      monthHistory.forEach((order) => {
        this.monthGain += order.realizedPnl + -order.commission;
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
        this.weekGain += order.realizedPnl + -order.commission;
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
        this.dayGain += order.realizedPnl + -order.commission;
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
              new Date(key.time).getMonth() ===
                new Date(currentDate).getMonth() &&
              new Date(key.time).getFullYear() ===
                new Date(currentDate).getFullYear()
          );
          break;
        case "all":
          this.historyOrders = this.saveHistory;
          break;
        case "month":
          this.monthHistory = true;
          this.weekHistory = false;
          this.dayHistory = false;
          break;
        case "week":
          this.monthHistory = false;
          this.weekHistory = true;
          this.dayHistory = false;
          break;
        case "day":
          this.monthHistory = false;
          this.weekHistory = false;
          this.dayHistory = true;
          break;
      }
    },
  },
});
