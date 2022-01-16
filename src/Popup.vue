<script setup></script>
<template>
  <header class="flex">
    <nav class="nav">
      <ul class="flex">
        <li>
          <router-link class="route" to="/popup.html/">Historique</router-link>
        </li>
        <li>
          <router-link class="route" to="/popup.html/positions"
            >Positions</router-link
          >
        </li>
        <li>
          <router-link class="route" to="/popup.html/stats"
            >Statistiques</router-link
          >
        </li>
      </ul>
    </nav>
    <div class="wallet">
      <h2 class="wallet__title">Portefeuille</h2>
      <p id="wallet" class="wallet__text">250 USD</p>
    </div>
    <div class="stats">
      <h2 class="stats__title">Aujourd'hui</h2>
      <p id="gain" class="stats__text">+ 25 USD</p>
    </div>
  </header>
  <router-view></router-view>
</template>
<style scoped>
/**
 * CSS IN RESET.CSS DU OF BUG I THINK!!
 */
</style>
