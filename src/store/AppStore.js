import { defineStore } from "pinia";

export const useAppStore = defineStore("application", {
  state: () => ({
    isLoading: true,
    isRefresh: false,
    isMonth: true,
    isWeekday: false,
    isDay: false,
  }),
  actions: {
    switchLoading() {
      this.isLoading = !this.isLoading;
    },
    switchRefresh() {
      this.isRefresh = !this.isRefresh;
    },
    switchIsMonth() {
      this.isMonth = !this.isMonth;
    },
    switchIsWeekday() {
      this.isWeekday = !this.isWeekday;
    },
    switchIsDay() {
      this.isDay = !this.isDay;
    },
  },
});
