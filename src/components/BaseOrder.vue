<script setup>
defineProps({
  order: Object,
});
</script>
<template>
  <article class="flex article">
    <h2 class="article__title">{{ order.symbol }}</h2>
    <p class="article__date">{{ order.date }}</p>
    <p class="article__commission">
      {{ order.commission.toFixed(2) }}
      {{ order.commissionAsset }}
    </p>
    <p class="article__price">{{ order.price }}</p>
    <p class="article__qty">{{ order.qty }}</p>
    <p
      class="article__pnl bold"
      :class="{
        'text-danger': order.realizedPnl < 0,
        profit: order.realizedPnl >= 0,
      }"
    >
      {{ order.realizedPnl.toFixed(2) }}
    </p>
    <p
      class="article__side"
      :class="{
        'text-danger': order.side === 'SELL',
        profit: order.side === 'BUY',
      }"
    >
      {{ order.side }}
    </p>
  </article>
</template>

<style scoped lang="scss">
.article {
  background: var(--secondary-color);
  padding: 0.8em;
  border-radius: 0.2em;
  margin: 1em;
  justify-content: space-around;

  -webkit-box-shadow: 1px 1px 5px 0 var(--secondary-color);
  box-shadow: 1px 1px 5px 0 var(--secondary-color);
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
</style>
