<template>
  <div class="wrapper">
    <div class="row">
      <div class="col-3">
        <!-- back button -->
        <button
          class="btn btn-primary float-left"
          v-if="$store.state.offset > 0"
          @click="previousPokemons()"
          title="Back"
        >
          ◄
        </button>
        <button
          v-else
          title="Back"
          class="btn btn-primary float-left"
          disabled="disabled"
        >
          ◄
        </button>
        <!-- TODO: add a real icon-library and replace the spcial-chars -->
      </div>
      <!-- searchfield -->
      <div :class="`col-6 ${shakeSearch === true ? 'shake' : ''}`">
        <div class="input-group">
          <input
            type="text"
            class="form-control"
            placeholder="# || id"
            aria-label="pokémon to search"
            aria-describedby="pokesearch"
            @keydown.enter="search()"
            v-model="pokemonToSearch"
          />
          <div class="input-group-append cursor-pointer" @click="search()">
            <button class="btn btn-primary" id="pokesearch">
              🔎
            </button>
          </div>
        </div>
      </div>
      <!-- next button -->
      <div class="col-3">
        <button
          title="Next"
          class="btn btn-primary float-right"
          @click="nextPokemons()"
        >
          ►
        </button>
      </div>
    </div>
    <!-- router-view -->
    <router-view v-slot="routerParams">
      <transition name="fade" mode="out-in">
        <keep-alive include="Pokedex">
          <component
            :is="routerParams.Component"
            :key="`${$store.state.offset}_${$store.state.limit}`"
          ></component>
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import methods from "../mixins/methods";
/**
 * just a wrapper to always display the buttons "at the top of the pokedex-view" without having them transition with the changing pokedex-component
 */
export default defineComponent({
  name: "PokedexWrapper",
  data() {
    return {
      pokemonToSearch: "",
      shakeSearch: false
    };
  },
  mixins: [methods],
  methods: {
    /**
     * checks whether a pokemon exists before re-routing to the pokemon-component
     * if the pokemon isn't valid we shake the search field around
     */
    async search() {
      // check whether we really have something to search
      if (String(this.pokemonToSearch).length <= 0) {
        this.hintAtSearchError(); // notify the user of the error
        // make sure no further code gets executed
        return false; // important !!!
      }
      // try because we could run into a loading-error
      try {
        // load the specified pokemon
        const pokemon = await this.loadPokemon(
          String(this.pokemonToSearch).replace(/^0+/g, "") // replace leading zeros
        );
        // set the new id so we can load the pokemon in the pokemon-component
        this.$store.state.id = pokemon.id;
        // re-route to the pokemon-component
        this.rerouteToPokemon();
      } catch (error) {
        this.hintAtSearchError(); // notify the user of the error
      }
    },
    /**
     * sets a bool used to decide whether to add a class to the searchfield which shakes it around to notify the user of a failed search request
     */
    hintAtSearchError() {
      this.shakeSearch = true;
      // change it back once the transition has surely finished
      window.setTimeout(() => {
        this.shakeSearch = false;
      }, 2000);
    }
  }
});
</script>
