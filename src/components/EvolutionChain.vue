<template>
  <div class="evolutionChain">
    <h3 class="text-center p-0 m-0 mb-2 text-white">Evolution-chain</h3>
    <div class="row" v-if="loading === false">
      <div class="col mb-4" v-if="chain">
        <Evolves :id="chain.species.name" />
      </div>
      <div class="col mb-4" v-if="chain && chain.evolves_to[0]">
        <Evolves :id="chain.evolves_to[0].species.name" />
      </div>
      <div
        class="col mb-4"
        v-if="chain && chain.evolves_to[0] && chain.evolves_to[0].evolves_to[0]"
      >
        <Evolves :id="chain.evolves_to[0].evolves_to[0].species.name" />
      </div>
      <div
        class="col mb-4"
        v-if="
          chain &&
            chain.evolves_to[0] &&
            chain.evolves_to[0].evolves_to[0] &&
            chain.evolves_to[0].evolves_to[0].evolves_to[0]
        "
      >
        <Evolves
          :id="chain.evolves_to[0].evolves_to[0].evolves_to[0].species.name"
        />
      </div>
      <div
        class="col mb-4"
        v-if="
          chain.species &&
            chain.evolves_to[0] &&
            chain.evolves_to[0].evolves_to[0] &&
            chain.evolves_to[0].evolves_to[0].evolves_to[0] &&
            chain.evolves_to[0].evolves_to[0].evolves_to[0].evolves_to[0]
        "
      >
        <Evolves
          :id="
            chain.evolves_to[0].evolves_to[0].evolves_to[0].evolves_to[0]
              .species.name
          "
        />
      </div>
    </div>
    <Spinner v-else class="text-center d-block" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Evolves from "@/components/Evolves.vue";
import Spinner from "@/components/Spinner.vue";
export default defineComponent({
  name: "EvolutionChain",
  data() {
    return {
      chain: null,
      loading: true // whether or not to display the loading-spinner
    };
  },
  props: {
    url: {
      type: String,
      required: true
    }
  },
  components: {
    Evolves,
    Spinner
  },
  mounted() {
    this.axios.get(this.url).then(response => {
      this.chain = response.data.chain;
      this.loading = false;
    });
  }
});
</script>

<style lang="scss" scoped>
.evolutionChain {
  min-height: 212px;
}
</style>
