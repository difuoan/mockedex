<template>
  <div class="pokemon text-center position-relative">
    <transition name="fade" mode="out-in">
      <div v-if="loading === false" class="text-left">
        <div class="container bg-white rounded border p-3">
          <div class="row" v-if="pokemon.name">
            <PokemonCard
              :pokemon="pokemon"
              :width="'192px'"
              class="col-12 col-md-6 col-lg-4 text-center mb-3"
            />
            <div class="col-12 col-md-6 col-lg-4 text-center mb-3">
              <div class="bg-primary border rounded container py-3 mb-3">
                <!-- pokemon-height and -weight -->
                <div class="row">
                  <div class="col">
                    <h5 class="text-white">Height</h5>
                    <b>{{ pokemon.height / 10 }} m</b>
                  </div>
                  <div class="col">
                    <h5 class="text-white">Weight</h5>
                    <b>{{ pokemon.weight / 100 }} kg</b>
                  </div>
                </div>
                <hr />
                <!-- pokemon-genus -->
                <div class="row">
                  <div class="col">
                    <h5 class="text-white">Genus</h5>
                    <b>{{
                      getValueByLanguage(pokemon.species.genera)[0].genus
                    }}</b>
                  </div>
                </div>
              </div>
              <!-- pokemon-abilities -->
              <Abilities :abilities="pokemon.abilities" />
            </div>
            <div class="col-12 col-md-6 col-lg-4 text-center mb-3">
              <!-- pokemon-stats -->
              <Stats :stats="pokemon.stats" />
              <!-- pokemon-items -->
              <Items
                :items="pokemon.held_items"
                v-if="pokemon.held_items.length > 0"
                class="mt-3"
              />
            </div>
            <div class="col-12 mb-3">
              <!-- pokemon-descriptions -->
              <Descriptions
                :flavourTexts="
                  getValueByLanguage(pokemon.species.flavor_text_entries)
                "
              />
            </div>
            <!-- pokemon-moves -->
            <div class="col-12">
              <Moves :moves="pokemon.moves" />
            </div>
            <!-- pokemon-evolution -->
            <div class="col-12">
              <EvolutionChain
                :url="pokemon.species.evolution_chain.url"
                class="mt-3 border rounded bg-secondary pt-2 px-4"
              />
            </div>
          </div>
        </div>
      </div>
      <Spinner v-else class="text-center" />
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import "../mixins/interfaces";
import methods from "../mixins/methods";
import Stats from "../components/Stats.vue";
import Moves from "../components/Moves.vue";
import Abilities from "../components/Abilities.vue";
import Descriptions from "../components/Descriptions.vue";
import Spinner from "../components/Spinner.vue";
import Items from "../components/Items.vue";
import EvolutionChain from "../components/EvolutionChain.vue";
import PokemonCard from "../components/PokemonCard.vue";
/**
 * loads the specified pokemon based on the id (possibly from the url)
 */
export default defineComponent({
  name: "Pokemon",
  data() {
    return {
      /**
       * the pokemon we want to display
       */
      pokemon: {} as Pokemon,
      loading: true // whether or not to display the loading-spinner
    };
  },
  components: {
    Stats,
    Moves,
    Abilities,
    Descriptions,
    Spinner,
    EvolutionChain,
    Items,
    PokemonCard
  },
  props: {
    /**
     * the id (possibly from the url) of the pokemon we want to load
     */
    id: {
      type: String,
      required: true
    }
  },
  async mounted() {
    // make sure we use the params (possibly from the url) as our internal state
    this.$store.state.id = Number(this.id);
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
      await this.loadPokemon(String(this.$store.state.id)).then(
        async pokemon => {
          // save the returned pokemon
          this.pokemon = pokemon;
          // disable the loading-spinner
          this.loading = false;
        }
      );
    }
  }
});
</script>
