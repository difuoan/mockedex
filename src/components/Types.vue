<template>
  <transition name="fade" mode="out-in">
    <div class="types" v-if="loaded">
      <b
        v-for="type in internalTypes"
        :key="`pokemon_type_${type.name}`"
        :style="`background: ${typeStyle(type.name)};`"
        class="rounded p-1 px-3 d-inline-block mb-2 mx-1"
        >{{ getValueByLanguage(type.names)[0].name }}</b
      >
    </div>
    <div v-else>
      <Spinner class="position-absolute" />
      <span class="rounded p-1 px-3 d-inline-block mb-2 mx-1">&nbsp;</span>
    </div>
  </transition>
</template>

<script lang="ts">
import methods from "../mixins/methods";
import { defineComponent } from "vue";
import { AxiosPromise, AxiosResponse } from "axios";
import Spinner from "../components/Spinner.vue";
/**
 * translates and displays the pokemons types based on the passed array
 */
export default defineComponent({
  name: "Types",
  data() {
    return {
      /**
       * the actual translated types
       */
      internalTypes: [] as Array<PokemonSpecies>,
      loaded: false // whether to display the loading-spinner or not
    };
  },
  components: {
    Spinner
  },
  props: {
    /**
     * the types we need to translate and then display
     */
    types: {
      type: Object,
      required: true
    }
  },
  async mounted() {
    // create requests based on the passed types
    const typesPromises: Array<AxiosPromise> = this.types.map(
      (type: PokemonSpecies) => this.axios.get(type.type.url)
    );
    // handle all the created requests at the same time
    const types: Array<AxiosResponse> = await this.axios.all(typesPromises);
    // save the response
    this.internalTypes = types.map(response => response.data as PokemonSpecies);
    this.loaded = true; // disable the loading-spinner
  },
  mixins: [methods],
  methods: {
    // TODO: move the type-styles into a mixin or something where it won't get duplicated with the component
    // TODO: make the type-styles into classes so we can share code between them and other places
    /**
     * returns the style (css) for the passed type (used to decide the design of the type-tag)
     */
    typeStyle(stat: string) {
      switch (stat) {
        case "normal":
          return "white; border: 1px solid lightgray;";
        case "water":
          return "blue; color: white";
        case "electric":
          return "yellow";
        case "bug":
          return "darkgreen; color: white";
        case "poison":
          return "purple; color: white";
        case "fairy":
          return "pink";
        case "ground":
          return "darkkhaki";
        case "fighting":
          return "orange";
        case "psychic":
          return "mediumpurple";
        case "rock":
          return "gray";
        case "steel":
          return "lightsteelblue";
        case "ice":
          return "cyan";
        case "grass":
          return "green; color: white";
        case "ghost":
          return "blueviolet; color: white";
        case "dragon":
          return "crimson; color: white";
        case "fire":
          return "firebrick; color: white";
        case "dark":
          return "black; color: white";
        case "flying":
          return "linear-gradient(180deg, cyan 50%, darkkhaki 50%, darkkhaki 100%)";
        default:
          return "white";
      }
    }
  }
});
</script>
