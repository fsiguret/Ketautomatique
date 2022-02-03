<script setup>
import { onBeforeMount } from "vue";
import { useOrderTradeStore } from "../store/orderTradeStore.js";
import { useAppStore } from "../store/AppStore.js";
import { storeToRefs } from "pinia";
import { getHistory } from "../js/fetchFunctions.js";
import BaseFilter from "../components/BaseFilter.vue";
import BaseOrder from "../components/BaseOrder.vue";
import RefreshButton from "../components/RefreshButton.vue";

const appStore = useAppStore();
const orderStore = useOrderTradeStore();

const { isLoading } = storeToRefs(appStore);
const { historyOrders } = storeToRefs(orderStore);

const { switchLoading } = useAppStore();
const { sortByDate, setHistoryOrders, filterOrder } = useOrderTradeStore();

onBeforeMount(async () => {
  await getHistory()
    .then((res) => {
      orderStore.$reset();
      sortByDate(res);
      setHistoryOrders(res);
      filterOrder("7");
    })
    .then(() => {
      if (isLoading.value) {
        switchLoading();
      }
    })
    .catch((err) => console.log(err));
});
</script>
<template>
  <section class="flex">
    <h1>Historique</h1>
    <div class="selection">
      <div id="filters" class="flex filters">
        <BaseFilter :label="'1 J'" :filter="'1'" />
        <BaseFilter :label="'7 J'" :filter="'7'" />
        <BaseFilter :label="'1 M'" :filter="'1m'" />
        <BaseFilter :label="'All'" :filter="'all'" />
        <RefreshButton />
      </div>
    </div>
    <svg class="loading" v-if="isLoading">
      <use href="/img/sprites.svg#loop"></use>
    </svg>
    <div class="history" v-else-if="historyOrders.length > 0">
      <div class="flex labels">
        <p>Symbole</p>
        <p>Date</p>
        <p>Commission</p>
        <p>Prix</p>
        <p>Quantité</p>
        <p>PNL</p>
        <p>Position</p>
      </div>
      <BaseOrder v-for="order in historyOrders" :key="order" :order="order" />
    </div>
    <div class="noHistory" v-else>
      <p>Vous n'avez pas d'historique !</p>
    </div>
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
  .loading {
    margin: 3em auto;
    color: var(--primary-color);
    animation: inLoop 1s linear infinite;
  }
  .selection {
    width: 100%;
  }
}
.history {
  width: 100%;
  .labels {
    margin: 1em;
    padding: 0.8em;
    justify-content: space-around;
    > p {
      width: 14%;
      text-align: center;
    }
  }
}
.noHistory {
  margin-top: 10em;
  p {
    font-size: 2em;
  }
}
@keyframes inLoop {
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0deg);
  }
}
</style>
