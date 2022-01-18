import { defineStore } from "pinia";

export const useOrderTradeStore = defineStore("orderTrade", {
  state: () => ({
    dayGain: "",
  }),
  actions: {
    calculateDayGain(gains) {
      gains.forEach((gain) => {
        let realPnl;
        if (gain.pnl < gain.commission) {
          realPnl = gain.commission - gain.pnl;
        } else {
          realPnl = gain.pnl - gain.commission;
        }
        this.dayGain = this.dayGain + realPnl;
      });
    },
  },
});
