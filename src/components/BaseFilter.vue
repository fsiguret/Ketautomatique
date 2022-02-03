<script setup>
import { useOrderTradeStore } from "../store/orderTradeStore.js";

const { filterOrder } = useOrderTradeStore();
defineProps({
  label: String,
  filter: String,
});

/**
 * Set the class "active" to the current button
 * @function active
 * @param event
 */
function active(event) {
  const filters = document.getElementById("filters");

  filters.childNodes.forEach((filter) => {
    filter.className = filter.className.replace(" active", "");
  });
  event.target.className += " active";
}
</script>
<template>
  <p
    class="filter"
    @click="
      filterOrder(filter);
      active($event);
    "
  >
    {{ label }}
  </p>
</template>

<style scoped lang="scss">
.filter {
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
</style>
