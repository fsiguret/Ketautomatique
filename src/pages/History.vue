<script setup>
import { onBeforeMount } from "vue";
import { useOrderTradeStore } from "../store/orderTradeStore.js";
import { useAppStore } from "../store/AppStore.js";
import { storeToRefs } from "pinia";
import { getHistory, refreshHistory } from "../js/fetchFunctions.js";

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
async function refresh() {
  let svg = document.querySelector(".refresh__svg").animate(
    [
      {
        transform: "rotate(360deg)",
      },
      {
        transform: "rotate(0deg)",
      },
    ],
    {
      duration: 500,
      iterations: Infinity,
    }
  );

  await refreshHistory()
    .then(async (res) => {
      if (res.ok) {
        await getHistory().then((res) => {
          orderStore.$reset();
          sortByDate(res);
          setHistoryOrders(res);
          filterOrder("7");
        });
      }
      svg.cancel();
    })
    .catch((err) => console.log(err));
}

function active(event) {
  const filters = document.getElementById("filters");

  filters.childNodes.forEach((filter) => {
    filter.className = filter.className.replace(" active", "");
  });
  event.target.className += " active";
}
</script>
<template>
  <section class="flex">
    <h1>Historique</h1>
    <svg class="loading" v-if="isLoading">
      <use href="/img/sprites.svg#loop"></use>
    </svg>
    <div class="history" v-else-if="historyOrders.length > 0">
      <div id="filters" class="flex filters">
        <p
          class="filter"
          @click="
            filterOrder('1');
            active($event);
          "
        >
          1 J
        </p>
        <p
          class="filter active"
          @click="
            filterOrder('7');
            active($event);
          "
        >
          7 J
        </p>
        <p
          class="filter"
          @click="
            filterOrder('1m');
            active($event);
          "
        >
          1 M
        </p>
        <p
          class="filter"
          @click="
            filterOrder('all');
            active($event);
          "
        >
          Tout
        </p>
        <div @click="refresh" class="refresh">
          <svg class="refresh__svg">
            <use href="/img/sprites.svg#loop"></use>
          </svg>
        </div>
      </div>
      <div class="flex labels">
        <p>Symbole</p>
        <p>Date</p>
        <p>Commission</p>
        <p>Prix</p>
        <p>Quantité</p>
        <p>PNL</p>
        <p>Position</p>
      </div>
      <article class="flex article" v-for="order in historyOrders" :key="order">
        <h2 class="article__title">{{ order.symbol }}</h2>
        <p class="article__date">{{ order.date }}</p>
        <p class="article__commission">
          {{ order.commission.toFixed(2) }} {{ order.commissionAsset }}
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
    .filters {
      p {
        cursor: pointer;
        margin: 0 0.5em;
        padding: 0.2em 0.6em;
        transition: background-color 0.5ms linear;
        text-align: center;
        border-radius: 0.2em;

        &:hover {
          background-color: var(--primary-color);
          -webkit-box-shadow: 3px 4px 10px 0 var(--primary-color);
          box-shadow: 3px 4px 10px 0 var(--primary-color);
        }
      }
      .refresh {
        background-color: var(--primary-color);
        transform: scaleX(-1);
        cursor: pointer;
        padding: 0.5em;
        border-radius: 0.2em;
        -webkit-box-shadow: -3px 4px 10px 0 var(--primary-color);
        box-shadow: -3px 4px 10px 0 var(--primary-color);
        &:hover svg {
          animation: inLoop 500ms infinite linear;
        }
        &__svg {
          width: 16px;
          height: 16px;
        }
        &:last-child {
          margin: 0 2em 0 auto;
        }
      }
    }
    .article {
      background: var(--primary-color);
      padding: 0.8em;
      border-radius: 0.2em;
      margin: 1em;
      justify-content: space-around;
      -webkit-box-shadow: 3px 4px 10px 0 var(--primary-color);
      box-shadow: 3px 4px 10px 0 var(--primary-color);
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
  }

  .noHistory {
    margin-top: 10em;
    p {
      font-size: 2em;
    }
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
