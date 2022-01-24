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
        <span class="bold">{{
          parseFloat(asset.walletBalance).toFixed(2)
        }}</span>
        {{ asset.asset }}
      </p>
    </article>
    <article class="gain flex">
      <h2 class="gain__tittle">Vos gains</h2>
      <p>
        Aujourd'hui <span class="bold">{{ dayGain.toFixed(2) }} USDT</span>
      </p>
      <p>
        Cette Semaine <span class="bold">{{ weekGain.toFixed(2) }} USDT</span>
      </p>
      <p>
        Ce mois <span class="bold">{{ monthGain.toFixed(2) }} USDT</span>
      </p>
      <p>
        Depuis le début <span class="bold">{{ allGain.toFixed(2) }} USDT</span>
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
    padding-top: 4em;
    font-size: 3em;
    width: 100%;
    text-align: center;
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
