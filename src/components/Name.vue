<template>
  <transition name="fade" mode="out-in">
    <span class="name" v-if="loaded">{{
      getValueByLanguage(internalName.names)[0].name
    }}</span>
    <span v-else>
      <Spinner class="position-absolute" />
      <span class="opacity-0">{{ name }}</span>
    </span>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Spinner from "./Spinner.vue";
import methods from "../mixins/methods";
/**
 * translates and displays the pokemons name
 */
export default defineComponent({
  name: "Name",
  data() {
    return {
      /**
       * the translated name (actually it's a pokemon-species, but the names are on that)
       */
      internalName: {} as () => Name,
      loaded: false // whether to display the loading-spinner or not
    };
  },
  mixins: [methods],
  components: {
    Spinner
  },
  props: {
    /**
     * the passed name we need to translate
     */
    name: {
      type: String,
      required: true
    }
  },
  async mounted() {
    // load the pokemons-species (which holds the name)
    const pokemonSpecies = await this.axios.get(
      `${this.$store.state.apiUrl}/pokemon-species/${this.name}`
    );
    // save the species
    this.internalName = pokemonSpecies.data;
    // hide the loading-spinner
    this.loaded = true;
  }
});
</script>
