import { defineStore } from "pinia";

export const useAppStore = defineStore("application", {
  state: () => ({
    isLoading: true,
  }),
  actions: {
    switchLoading() {
      this.isLoading = !this.isLoading;
    },
  },
});
