<script setup>
import Wallet from "../components/Wallet.vue";
import Gains from "../components/Gains.vue";
import GainHistory from "../components/GainHistory.vue";
</script>
<template>
  <section class="stats">
    <h1>Stats</h1>
    <Wallet />
    <Gains />
    <GainHistory />
  </section>
</template>

<style scoped lang="scss">
.stats {
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
  section {
    background-color: var(--secondary-color);
    border-radius: 0.2em;
    padding: 1em;
    margin: 2em;
    -webkit-box-shadow: 1px 1px 10px 0 var(--secondary-color);
    box-shadow: 1px 1px 10px 0 var(--secondary-color);
  }
}
</style>
