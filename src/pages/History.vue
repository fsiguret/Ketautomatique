<script setup>
import { onBeforeMount, ref } from "vue";
import { useOrderTradeStore } from "../store/orderTradeStore.js";

const { addNewOrder } = useOrderTradeStore();

let orderHistory = ref({});
let isLoading = ref(true);

onBeforeMount(async () => {
  orderHistory.value = await fetch("http://localhost:3000/api/order/").then(
    (response) => {
      isLoading.value = !isLoading.value;
      return response.json();
    }
  );
});
</script>
<template>
  <h1>Historique</h1>
  <svg v-if="isLoading"><use href="/img/sprites.svg#loop"></use></svg>
  <div v-else>
    <div class="flex labels">
      <p>Symbole</p>
      <p>Date</p>
      <p>Commission</p>
      <p>Prix</p>
      <p>Quantité</p>
      <p>PNL</p>
      <p>Position</p>
    </div>
    <article
      class="flex article"
      v-for="order in orderHistory.orders"
      :key="order"
    >
      <h2 class="article__title">{{ order.symbol }}</h2>
      <p class="article__date">{{ order.time }}</p>
      <p class="article__commission">
        {{ order.commission }} {{ order.commissionAsset }}
      </p>
      <p class="article__price">{{ order.price }}</p>
      <p class="article__qty">{{ order.qty }}</p>
      <p class="article__pnl">{{ order.realizedPnl }}</p>
      <p class="article__side">{{ order.side }}</p>
    </article>
  </div>
</template>
<style scoped lang="scss">
h1 {
  padding-top: 4em;
  font-size: 3em;
  width: 100%;
  text-align: center;
}
svg {
  margin: 3em auto;
  color: var(--secondary-color);
  animation: inLoop 1s linear infinite;
}
.labels {
  margin: 1em;
  padding: 0.8em;
  justify-content: space-around;
  > p {
    width: 14%;
    text-align: center;
  }
}
.article {
  background: var(--secondary-color);
  padding: 0.8em;
  border-radius: 0.2em;
  margin: 1em;
  justify-content: space-around;
  > p {
    width: 14%;
    text-align: center;
  }
  &__tittle {
    font-size: 1.5em;
  }
  &__date {
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
