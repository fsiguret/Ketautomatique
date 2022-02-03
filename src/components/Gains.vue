<script setup>
import { storeToRefs } from "pinia";
import { useOrderTradeStore } from "../store/orderTradeStore.js";
const orderStore = useOrderTradeStore();

const { dayGain, weekGain, monthGain, allGain, historyOrders } =
  storeToRefs(orderStore);
</script>
<template>
  <article class="gain flex">
    <h2 class="gain__tittle">Vos gains</h2>
    <p>
      Aujourd'hui
      <span
        class="bold"
        :class="{ profit: dayGain >= 0, 'text-danger': dayGain < 0 }"
        >{{ dayGain.toFixed(2) }}</span
      >
      USDT
    </p>
    <p>
      Cette Semaine
      <span
        class="bold"
        :class="{ profit: weekGain >= 0, 'text-danger': weekGain < 0 }"
        >{{ weekGain.toFixed(2) }}</span
      >
      USDT
    </p>
    <p>
      Ce mois
      <span
        class="bold"
        :class="{ profit: monthGain >= 0, 'text-danger': monthGain < 0 }"
        >{{ monthGain.toFixed(2) }}</span
      >
      USDT
    </p>
    <p>
      Depuis le début
      <span
        class="bold"
        :class="{ profit: allGain >= 0, 'text-danger': allGain < 0 }"
        >{{ allGain.toFixed(2) }}</span
      >
      USDT
    </p>
  </article>
</template>

<style scoped lang="scss">
.gain {
  flex-wrap: wrap;
  &__tittle {
    width: 100%;
    text-align: center;
    padding: 1em;
  }
  p {
    text-align: center;
    padding: 0.5em;
    width: 50%;
  }
}
</style>
