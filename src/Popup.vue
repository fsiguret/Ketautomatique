<script setup>
import { onMounted } from "vue";

import { useOrderTradeStore } from "./store/orderTradeStore";
import { useAccountStore } from "./store/accountStore";
import { storeToRefs } from "pinia";
import {
  getFuturesAccount,
  getHistory,
  refreshHistory,
} from "./js/fetchFunctions";
const orderStore = useOrderTradeStore();
const accountStore = useAccountStore();
const { wallet } = storeToRefs(accountStore);
const { dayGain } = storeToRefs(orderStore);
const { setAccountInfos } = useAccountStore();
const { sortByDate, setHistoryOrders, filterOrder } = useOrderTradeStore();

onMounted(async () => {
  await getFuturesAccount()
    .then((res) => {
      setAccountInfos(res);
    })
    .catch((err) => console.log(err));
  await refreshHistory()
    .then(async (res) => {
      if (res.ok) {
        await getHistory().then((res) => {
          orderStore.$reset();
          sortByDate(res);
          setHistoryOrders(res);
          filterOrder("7");
        });
      }
    })
    .catch((err) => console.log(err));
});
</script>
<template>
  <header class="flex">
    <nav class="nav flex">
      <router-link class="route" to="/popup.html/">Historique</router-link>
      <router-link class="route" to="/popup.html/positions"
        >Positions</router-link
      >
      <router-link class="route" to="/popup.html/stats"
        >Statistiques</router-link
      >
    </nav>
    <div class="wallet">
      <h2 class="wallet__title">Portefeuille</h2>
      <p id="wallet" class="wallet__text">
        <span class="bold">{{ wallet }}</span> USDT
      </p>
    </div>
    <div class="stats">
      <h2 class="stats__title">Aujourd'hui</h2>
      <p id="gain" class="stats__text">
        <span class="bold">{{ dayGain.toFixed(2) }}</span> USDT
      </p>
    </div>
  </header>
  <router-view></router-view>
</template>
<style scoped>
/**
 * CSS IN RESET.CSS DU OF BUG I THINK!!
 */
</style>
