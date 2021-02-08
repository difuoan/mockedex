<template>
  <div class="evolves">
    <PokemonCard
      @click="rerouteToPokemonWrapper()"
      v-if="loading === false"
      :pokemon="pokemon"
      :displayButtons="false"
      :displayTypes="false"
      class="text-center border rounded cursor-pointer pokemonCard bg-white py-2"
    />
    <Spinner v-else class="text-center" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import methods from "../mixins/methods";
import PokemonCard from "../components/PokemonCard.vue";
import Spinner from "../components/Spinner.vue";
export default defineComponent({
  name: "Evolves",
  data() {
    return {
      /**
       * the pokemon we want to display
       */
      pokemon: {} as Pokemon,
      loading: true // whether or not to display the loading-spinner
    };
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  components: {
    PokemonCard,
    Spinner
  },
  async mounted() {
    // load the pokemon
    this.loadPokemonWrapper();
  },
  mixins: [methods],
  methods: {
    /**
     * just a wrapper for the real loadPokemon-function but it also enables and disables the loading-spinner
     */
    async loadPokemonWrapper() {
      // make sure the state is valid
      this.fixStateIfNecessary();
      // enable the loading-spinner
      this.loading = true;
      // load the pokemon
      await this.loadPokemon(String(this.id)).then(pokemon => {
        // save the returned pokemon
        this.pokemon = pokemon;
        // disable the loading-spinner
        this.loading = false;
      });
    },
    // TODO: can be made into a shared function
    rerouteToPokemonWrapper() {
      this.$store.state.id = this.pokemon.id;
      this.rerouteToPokemon();
    }
  }
});
</script>

<style lang="scss">
.pokemonCard {
  &:hover {
    animation: bounce 2s infinite;
    animation-fill-mode: both;
  }
}
</style>
