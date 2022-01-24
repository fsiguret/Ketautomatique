import { defineStore } from "pinia";

export const useAccountStore = defineStore("account", {
  state: () => ({
    accountInfos: {},
    wallet: 0,
  }),
  actions: {
    setAccountInfos(accountInfos) {
      this.accountInfos = accountInfos;
      this.wallet = parseFloat(this.accountInfos.availableBalance).toFixed(2);
    },
  },
});
