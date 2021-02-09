<template>
  <div class="pokemonCard">
    <h3 class="mb-0">
      <!-- pokemon id -->
      <small>#{{ pad(String(pokemon.order), 4, "0", true) }}&nbsp;</small>
      <!-- pokemon-name -->
      <Name :name="pokemon.name" />
    </h3>
    <!-- pokemon-types -->
    <div class="mt-1" v-if="displayTypes">
      <Types :types="pokemon.types" />
    </div>
    <!-- pkemon-image -->
    <PokemonImage
      :sprites="pokemon.sprites"
      :displayButtons="displayButtons"
      :width="width"
      :height="height"
    />
  </div>
</template>

<script lang="ts">
import Types from "../components/Types.vue";
import PokemonImage from "../components/PokemonImage.vue";
import Name from "../components/Name.vue";
import { defineComponent } from "vue";
import methods from "../mixins/methods";
/**
 * translates and displays the pokemons name
 */
export default defineComponent({
  name: "PokemonCard",
  props: {
    pokemon: {
      type: Object as () => Pokemon,
      required: true
    },
    /**
     * whether or not we want to display all the buttons to choose the sprite (or not)
     */
    displayButtons: {
      type: Boolean,
      required: false,
      default: true
    },
    displayTypes: {
      type: Boolean,
      required: false,
      default: true
    },
    // optional with parameter (note the necessary unit value at the end)
    width: {
      type: String,
      required: false,
      default: "96px"
    },
    // optional with parameter (note the necessary unit value at the end)
    height: {
      type: String,
      required: false,
      default: "96px"
    }
  },
  mixins: [methods],
  components: {
    Types,
    PokemonImage,
    Name
  }
});
</script>
