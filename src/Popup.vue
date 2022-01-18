<script setup>
import { ref } from "vue";

let dayGain = ref(0);
let wallet = ref(250);
let stringDayGain;
if (dayGain.value >= 0) {
  stringDayGain = `+ ${dayGain.value}`;
} else {
  stringDayGain = `- ${dayGain.value}`;
}
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
      <p id="wallet" class="wallet__text">{{ wallet }} USD</p>
    </div>
    <div class="stats">
      <h2 class="stats__title">Aujourd'hui</h2>
      <p id="gain" class="stats__text">
        <span>{{ stringDayGain }}</span> USD
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
