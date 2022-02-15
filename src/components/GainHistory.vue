<script setup>
import BaseFilter from "./BaseFilter.vue";
import { useOrderTradeStore } from "../store/orderTradeStore.js";
import { storeToRefs } from "pinia";
import { onBeforeMount } from "vue";
const {
  filterOrder,
  setGainHistory,
  gainPerMonth,
  gainPerWeek,
  gainPerDay,
  gainPerYear,
} = useOrderTradeStore();
const orderStore = useOrderTradeStore();
const {
  monthsGains,
  weeksGains,
  daysGains,
  monthHistory,
  weekHistory,
  dayHistory,
  yearGains,
} = storeToRefs(orderStore);

onBeforeMount(() => {
  setGainHistory();
  gainPerMonth();
  gainPerWeek();
  gainPerDay();
  gainPerYear();
});
</script>
<template>
  <section class="gainHistory flex">
    <h2 class="gainHistory__tittle">Historique des gains</h2>
    <div id="filters" class="flex filters">
      <BaseFilter
        :label="'Mois'"
        @click="filterOrder('month')"
        :activeDefault="true"
      />
      <BaseFilter :label="'Semaines'" @click="filterOrder('week')" />
      <BaseFilter :label="'Jours'" @click="filterOrder('day')" />
    </div>
    <div class="yearGain">
      <p>
        Cette Année :
        <span
          :class="{
            profit: parseFloat(yearGains) >= 0,
            'text-danger': parseFloat(yearGains) < 0,
          }"
          >{{ yearGains.toFixed(2) }}
        </span>
        USDT
      </p>
    </div>
    <article class="article" v-if="monthHistory">
      <div v-for="(month, index) in monthsGains" :key="month">
        <p class="flex">
          <span>{{
            Intl.DateTimeFormat("fr", { month: "long" }).format(
              new Date((parseInt(index) + 1).toString())
            )
          }}</span>
          <span
            :class="{
              profit: parseFloat(month) >= 0,
              'text-danger': parseFloat(month) < 0,
            }"
            >{{ month.toFixed(2) }} USDT</span
          >
        </p>
      </div>
    </article>
    <article class="article" v-else-if="weekHistory">
      <div v-for="(week, index) in weeksGains" :key="week">
        <p class="flex">
          <span>Semaine {{ index }} : </span>
          <span
            :class="{
              profit: parseFloat(week) >= 0,
              'text-danger': parseFloat(week) < 0,
            }"
            >{{ week }}</span
          >
        </p>
      </div>
    </article>
    <article class="article" v-else-if="dayHistory">
      <div v-for="(day, index) in daysGains" :key="day">
        <p class="flex">
          <span>{{ index }}</span>
          <span
            :class="{
              profit: parseFloat(day) >= 0,
              'text-danger': parseFloat(day) < 0,
            }"
            >{{ day }} USDT</span
          >
        </p>
      </div>
    </article>
  </section>
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
}
.yearGain {
  margin: 1em;
}
.article {
  background: var(--primary-color);
  width: 95%;
  padding: 0.8em;
  border-radius: 0.2em;
  margin: 1em;

  -webkit-box-shadow: 1px 1px 5px 0 var(--primary-color);
  box-shadow: 1px 1px 5px 0 var(--primary-color);
  div {
    background: var(--secondary-color);
    padding: 0.8em;
    border-radius: 0.2em;
    margin: 1em;
    -webkit-box-shadow: 1px 1px 5px 0 var(--secondary-color);
    box-shadow: 1px 1px 5px 0 var(--secondary-color);
    p {
      width: 100%;
      span {
        width: 50%;
        text-align: start;
        text-transform: uppercase;
      }
    }
    &__tittle {
      font-size: 1.5em;
    }
    &__date {
    }
  }
}
</style>
