<script setup>
import { ref } from "vue";

let result = ref(0);
let price;
let priceSmooth;
let quantityPrice;
let quantitySmooth;

function priceSmoothing() {
  const resultToCheck =
    (parseFloat(price) * parseFloat(quantityPrice) +
      parseFloat(priceSmooth) * parseFloat(quantitySmooth)) /
    (parseFloat(quantityPrice) + parseFloat(quantitySmooth));

  if (resultToCheck >= 0) {
    result.value = resultToCheck;
  }
}
</script>
<template>
  <section>
    <h1>Positions</h1>
    <!--    TODO: CHECK THE CURRENT ORDERS AND UPDATE THEM WITH THE BINANCE WEBSOCKET -->
    <!--    <p>Vous n'avez pas de trade en cours !</p>-->
    <article>
      <h2>Lissage du prix</h2>
      <form @submit.prevent="priceSmoothing" class="flex">
        <div class="flex">
          <label for="price">Prix</label>
          <input
            type="text"
            name="price"
            id="price"
            placeholder="30"
            v-model="price"
          />
        </div>
        <div class="flex">
          <label for="priceSmooth">Prix Lissage</label>
          <input
            type="text"
            name="priceSmooth"
            id="priceSmooth"
            placeholder="30"
            v-model="priceSmooth"
          />
        </div>
        <div class="flex">
          <label for="quantityPrice">Qté. prix</label>
          <input
            type="text"
            name="quantityPrice"
            id="quantityPrice"
            placeholder="30"
            v-model="quantityPrice"
          />
        </div>
        <div class="flex">
          <label for="quantitySmooth">Qté. lissage</label>
          <input
            type="text"
            name="quantitySmooth"
            id="quantitySmooth"
            placeholder="30"
            v-model="quantitySmooth"
          />
        </div>
        <button class="route button" type="submit">Calculer</button>
      </form>
      <p>
        Résultat: <span>{{ result.toFixed(2) }}</span>
      </p>
    </article>
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
  article {
    background: var(--primary-color);
    padding: 0.8em;
    border-radius: 0.2em;
    margin: 1em;
    justify-content: space-around;
    -webkit-box-shadow: 3px 4px 10px 0 var(--primary-color);
    box-shadow: 3px 4px 10px 0 var(--primary-color);
    h2 {
      text-align: center;
    }
    form {
      flex-direction: column;
      justify-content: center;
      div {
        width: 50%;
        justify-content: space-between;
        margin: 0.5em;
        input {
          background: var(--primary-color);
          border: var(--secondary-color) 2px solid;
          border-radius: 0.25em;
          color: var(--font-color-light);
          padding: 0.3em;
        }
      }
      button {
        border: none;
        cursor: pointer;
      }
    }
    p {
      text-align: center;
      font-size: 1.5em;
    }
  }
}
</style>
