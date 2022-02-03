<script setup>
import { storeToRefs } from "pinia";
import { useOrderTradeStore } from "../store/orderTradeStore.js";
import { useAppStore } from "../store/AppStore.js";
const orderStore = useOrderTradeStore();
const appStore = useAppStore();
const { setYearHistory } = useOrderTradeStore();
const { isMonth, isWeekday, isDay } = storeToRefs(appStore);
const { historyOrders } = storeToRefs(orderStore);

const years = new Set();
function setupYear() {
  historyOrders.value.forEach((order) => {
    const orderDate = new Date(order.time).getFullYear();
    years.add(orderDate);
  });
  setYearHistory(new Date().getFullYear());
}
function showHistory(event) {
  setYearHistory(parseInt(event.target.textContent));
  switchFilters("month");
}
function switchFilters(filter) {
  switch (filter) {
    case "month":
  }
}
setupYear();
</script>
<template>
  <article class="gainHistory flex">
    <h2 class="gainHistory__tittle">Historique des gains</h2>
    <ul class="gainHistory__years flex">
      <li v-for="year in years" :key="year" @click="showHistory($event)">
        {{ year }}
      </li>
    </ul>
    <ul class="gainHistory__filter flex">
      <li @click="switchFilters('month')">Mois</li>
      <li @click="switchFilters('weekday')">Semaines</li>
      <li @click="switchFilters('day')">Jours</li>
    </ul>

    <table v-if="isMonth">
      <thead>
        <tr>
          <th>Mois</th>
          <th>Gains</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Janvier</td>
          <td>+ 150 USDT</td>
        </tr>
      </tbody>
    </table>
    <table v-if="isWeekday">
      <thead>
        <tr>
          <th>Semaines</th>
          <th>Gains</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Semaine 1</td>
          <td>+ 150 USDT</td>
        </tr>
      </tbody>
    </table>
    <table v-if="isDay">
      <thead>
        <tr>
          <th>Jours</th>
          <th>Gains</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Lundi</td>
          <td>+ 150 USDT</td>
        </tr>
      </tbody>
    </table>
  </article>
</template>

<style scoped lang="scss">
.gainHistory {
  flex-direction: column;
  margin-bottom: 1em;
  &__tittle {
    width: 100%;
    text-align: center;
    padding: 1em;
  }
  &__years {
    list-style: none;
    padding: 0;
    li {
      margin: 0.5em;
      padding: 0.3em 0.5em;
      background-color: var(--secondary-color);
      cursor: pointer;
      border-radius: 0.2em;
      -webkit-box-shadow: 1px 1px 4px 0 var(--secondary-color);
      box-shadow: 1px 1px 4px 0 var(--secondary-color);
      transition: transform 100ms;

      &:hover {
        transform: scale(1.05);
      }
    }
  }
  &__filter {
    list-style: none;
    padding: 0;
    li {
      margin: 0.5em;
      cursor: pointer;
      padding: 0.3em 0.5em;
      &:hover {
        background-color: var(--secondary-color);
        -webkit-box-shadow: 1px 1px 4px 0 var(--secondary-color);
        box-shadow: 1px 1px 4px 0 var(--secondary-color);
        border-radius: 0.2em;
      }
    }
  }
}
</style>
