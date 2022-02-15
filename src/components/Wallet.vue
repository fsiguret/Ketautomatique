<script setup>
import { storeToRefs } from "pinia";
import { useAccountStore } from "../store/accountStore.js";
const accountStore = useAccountStore();

const { accountInfos } = storeToRefs(accountStore);
</script>
<template>
  <section class="wallet flex">
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
  </section>
</template>

<style scoped lang="scss">
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
</style>
