<script setup>
defineProps({
  label: String,
  activeDefault: Boolean,
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
  <p class="filter" :class="{ active: activeDefault }" @click="active($event)">
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
    background-color: var(--third-color);
    -webkit-box-shadow: 1px 1px 5px 0 var(--third-color);
    box-shadow: 1px 1px 5px 0 var(--third-color);
  }
}
</style>
