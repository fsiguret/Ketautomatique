import { defineStore } from "pinia";

export const useAppStore = defineStore("application", {
  state: () => ({
    isLoading: true,
    isRefresh: false,
  }),
  actions: {
    switchLoading() {
      this.isLoading = !this.isLoading;
    },
    switchRefresh() {
      this.isRefresh = !this.isRefresh;
    },
  },
});
