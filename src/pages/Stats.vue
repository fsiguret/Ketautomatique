<script setup>
import Wallet from "../components/Wallet.vue";
import Gains from "../components/Gains.vue";
import GainHistory from "../components/GainHistory.vue";
</script>
<template>
  <section>
    <h1>Stats</h1>
    <Wallet />
    <Gains />
    <GainHistory />
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
}
</style>
