<script setup>
import { getHistory, refreshHistory } from "../js/fetchFunctions.js";
import { useOrderTradeStore } from "../store/orderTradeStore.js";
import { storeToRefs } from "pinia";
import { useAppStore } from "../store/AppStore.js";
const orderStore = useOrderTradeStore();
const appStore = useAppStore();
const { isRefresh } = storeToRefs(appStore);
const { switchRefresh } = useAppStore();
const { sortByDate, setHistoryOrders, filterOrder } = useOrderTradeStore();

async function refresh() {
  if (!isRefresh.value) {
    switchRefresh();
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
            switchRefresh();
          });
        }

        svg.cancel();
      })
      .catch((err) => console.log(err));
  }
}
</script>
<template>
  <div @click="refresh($event)" class="refresh">
    <svg class="refresh__svg">
      <use href="/img/sprites.svg#loop"></use>
    </svg>
  </div>
</template>

<style scoped lang="scss">
.refresh {
  background-color: var(--primary-color);
  transform: scaleX(-1);
  cursor: pointer;
  margin: 0 2em 0 auto;
  padding: 0.5em;
  border-radius: 0.2em;
  -webkit-box-shadow: -3px 4px 10px 0 var(--primary-color);
  box-shadow: -3px 4px 10px 0 var(--primary-color);
  &__svg {
    width: 16px;
    height: 16px;
  }
  &:hover svg {
    animation: inLoop 500ms infinite linear;
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
