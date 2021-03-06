<template>
  <div class="pokedex">
    <div class="clear"></div>
    <div class="position-relative">
      <transition name="fade" mode="out-in">
        <div v-if="loading === false" class="mb-4 pb-4">
          <div class="row justify-content-md-center">
            <!-- the list of pokemons -->
            <div
              v-for="pokemon in pokemons"
              :key="`pokemon_card_${pokemon.id}`"
              class="col-12 col-sm-6 col-md-4 col-lg-3 mb-3"
              :title="pokemon.name"
            >
              <PokemonCard
                :pokemon="pokemon"
                class="card-img-top border bg-white cursor-pointer"
                @click="rerouteToPokemonWrapper(pokemon.id)"
                :displayButtons="false"
                :displayTypes="false"
              />
            </div>
          </div>
          <div class="row">
            <!-- back button -->
            <div class="col-12 col-md-3 mb-3">
              <button
                class="btn btn-primary btn-block"
                v-if="$store.state.offset > 0"
                @click="previousPokemons()"
                title="Back"
              >
                ◄
              </button>
              <button
                v-else
                title="Back"
                class="btn btn-primary btn-block"
                disabled="disabled"
              >
                ◄
              </button>
            </div>
            <div class="col-12 col-md-6 d-none d-md-block"></div>
            <!-- next button -->
            <div class="col-12 col-md-3 mb-3">
              <button
                title="Next"
                class="btn btn-primary btn-block"
                @click="nextPokemons()"
              >
                ►
              </button>
            </div>
            <!-- limit -->
            <div class="col-12 col-md-6 d-block d-md-none">
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <label class="input-group-text" for="limit">Limit</label>
                </div>
                <select
                  class="custom-select"
                  id="limit"
                  v-model="$store.state.limit"
                  @change="changeLimit"
                >
                  <option value="4">4</option>
                  <option value="8">8</option>
                  <option value="16">16</option>
                  <option value="32">32</option>
                  <option value="64">64</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <Spinner v-else />
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import "../mixins/interfaces";
import methods from "../mixins/methods";
import { AxiosPromise, AxiosResponse } from "axios";
import Spinner from "../components/Spinner.vue";
import PokemonCard from "../components/PokemonCard.vue";
/**
 * displays multiple pokemons at the same time based on the (store.state.)offset and (store.state.)limit
 */
export default defineComponent({
  name: "Pokedex",
  data() {
    return {
      /**
       * the pokemons we want to display
       */
      pokemons: new Array<Pokemon>(),
      loading: true, // whether or not to display the loading-spinner
      pokemonToSearch: "", // the text- or number-id of a pokemon we want to load
      shakeSearch: false // whether or not to shake around the search field (used when entering an invalid id to search)
    };
  },
  props: {
    /**
     * where we start loading the list of pokemons (pokemons before won't get loaded)
     */
    offset: {
      type: String,
      required: true
    },
    /**
     * how many pokemon we want to load
     */
    limit: {
      type: String,
      required: true
    }
  },
  components: {
    PokemonCard,
    Spinner
  },
  mixins: [methods],
  async mounted() {
    // make sure we use the params (possibly from the url) as our internal state
    this.$store.state.offset = Number(this.offset);
    this.$store.state.limit = Number(this.limit);
    // check whether the current state is valid and fix it if necessary
    this.fixStateIfNecessary();
    // load our list of pokemons once we are ready and sure it will be okay to load them
    this.loadPokemons();
  },
  methods: {
    rerouteToPokemonWrapper(id: number) {
      this.$store.state.id = id;
      this.rerouteToPokemon();
    },
    /**
     * re-route to the new route once the user changes the limit (because the limit is also represented in the url)
     */
    async changeLimit() {
      this.$router.push({
        name: "Pokedex",
        params: {
          offset: this.$store.state.offset,
          limit: this.$store.state.limit
        }
      });
    },
    /**
     * loads the list of pokemons we want to display
     */
    async loadPokemons() {
      this.fixStateIfNecessary(); // try to fix the state if necessary
      this.loading = true; // display the loading-spinner
      // get the list of pokemons we want to display from the api
      const result = await this.axios.get(
        `${this.$store.state.apiUrl}/pokemon?limit=${this.$store.state.limit}&offset=${this.$store.state.offset}`
      );
      // map the pokemon names into an array so we can create requests from it
      const urlArray = result.data.results.map(
        (result: { name: string }) => result.name
      );
      // create requests based on the pokemons names (text-ids)
      const promiseArray = urlArray.map((name: string) =>
        this.axios.get(`${this.$store.state.apiUrl}/pokemon/${name}`)
      ) as Array<AxiosPromise>;
      // check whether we really have requests to handle, because if not we just loaded an empty list of pokemon
      if (promiseArray.length <= 0) {
        // obviously we need to fix our store
        this.resetStore();
        // and then update the app
        this.rerouteToPokedex();
        // make sure no further code will get executed
        return false; // very important !!!
      }
      // handle all requests simultaniousely and map them onto our internal list of pokemons (which we display)
      this.axios.all(promiseArray).then((responses: Array<AxiosResponse>) => {
        this.pokemons = responses.map(
          response => response.data as Pokemon
        ) as Array<Pokemon>;
        // disable the loading-spinner
        this.loading = false;
      });
    }
  }
});
</script>

<style scoped lang="scss">
.card {
  z-index: 999;
  cursor: pointer;
  &:hover {
    animation: bounce 2s infinite;
    animation-fill-mode: both;
  }
}
* {
  text-align: center;
}
</style>
