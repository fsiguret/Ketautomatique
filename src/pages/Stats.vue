<script setup>
import { useAccountStore } from "../store/accountStore";
import { useOrderTradeStore } from "../store/orderTradeStore";
import { storeToRefs } from "pinia";
const accountStore = useAccountStore();
const orderStore = useOrderTradeStore();
const { accountInfos } = storeToRefs(accountStore);
const { dayGain, weekGain, monthGain, allGain } = storeToRefs(orderStore);
</script>
<template>
  <section>
    <h1>Stats</h1>
    <article class="wallet flex">
      <h2 class="wallet__tittle">Vos portefeuilles</h2>
      <p v-for="asset in accountInfos.assets" :key="asset">
        <span
          class="bold"
          :class="{
            profit: parseFloat(asset.walletBalance) >= 0,
            'text-danger': parseFloat(asset.walletBalance) < 0,
          }"
          >{{ parseFloat(asset.walletBalance).toFixed(2) }}</span
        >
        {{ asset.asset }}
      </p>
    </article>
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
  </section>
</template>

<style scoped lang="scss">
section {
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h1 {
    padding-top: 4.5em;
    font-size: 3em;
    width: 100%;
    text-align: center;
    text-transform: uppercase;
  }
  article {
    background-color: var(--primary-color);
    border-radius: 0.2em;
    padding: 1em;
    margin: 2em;
    -webkit-box-shadow: 3px 4px 10px 0 var(--primary-color);
    box-shadow: 3px 4px 10px 0 var(--primary-color);
  }
  .wallet {
    flex-wrap: wrap;
    &__tittle {
      width: 100%;
      text-align: center;
      padding: 1em;
    }
    p {
      padding: 0.5em;
      width: 33%;
    }
  }
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
}
</style>
