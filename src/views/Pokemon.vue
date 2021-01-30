<template>
  <div class="pokemon text-center position-relative">
    <transition name="fade" mode="out-in">
      <div v-if="loading === false" class="text-left">
        <div class="container bg-white rounded border p-3">
          <div class="row" v-if="pokemon.name">
            <div class="col-12 col-md-6 col-lg-4 text-center mb-3">
              <h3 class="mb-0">
                <small>#{{ pad(String(pokemon.id), 4, "0", true) }}</small>
                {{ getValueByLanguage(pokemon.species.names)[0].name }}
              </h3>
              <div class="mt-1">
                <Types :types="pokemon.types" />
              </div>
              <PokemonImage :sprites="pokemon.sprites" />
            </div>
            <div class="col-12 col-md-6 col-lg-4 text-center mb-3">
              <div class="bg-primary border rounded container py-3 mb-3">
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
                <div class="row">
                  <div class="col">
                    <h5 class="text-white">Genus</h5>
                    <b>{{
                      getValueByLanguage(pokemon.species.genera)[0].genus
                    }}</b>
                  </div>
                </div>
              </div>
              <Abilities :abilities="pokemon.abilities" />
            </div>
            <div class="col-12 col-md-6 col-lg-4 text-center mb-3">
              <Stats :stats="pokemon.stats" class="mb-3" />
              <div
                v-if="pokemon.held_items.length > 0"
                class="bg-white border rounded p-3"
              >
                <b>Item{{ pokemon.held_items.length > 1 ? "s" : "" }}:</b>
                <span
                  v-for="(item, index) in pokemon.held_items"
                  :key="`pokemon_item_${item.item.name}`"
                  >&nbsp;{{ item.item.name
                  }}{{
                    index + 2 >= pokemon.held_items.length
                      ? index + 1 >= pokemon.held_items.length
                        ? ""
                        : " and"
                      : ", "
                  }}</span
                >
              </div>
            </div>
            <div class="col-12 mb-3">
              <Descriptions
                :flavourTexts="
                  getValueByLanguage(pokemon.species.flavor_text_entries)
                "
              />
            </div>
            <div class="col-12 mb-3">
              <Moves :moves="pokemon.moves" />
            </div>
          </div>
        </div>
      </div>
      <div v-else class="mainSpinner spinner-border text-primary" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import "../mixins/interfaces";
import methods from "../mixins/methods";
import Stats from "../components/Stats.vue";
import Moves from "../components/Moves.vue";
import Types from "../components/Types.vue";
import Abilities from "../components/Abilities.vue";
import Descriptions from "../components/Descriptions.vue";
import PokemonImage from "../components/PokemonImage.vue";

export default defineComponent({
  name: "Pokemon",
  data() {
    return {
      pokemon: {} as Pokemon,
      loading: true
    };
  },
  components: {
    Stats,
    Moves,
    Types,
    Abilities,
    Descriptions,
    PokemonImage
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  watch: {
    "$store.state.id": function() {
      this.loadPokemonWrapper();
    }
  },
  async mounted() {
    this.$store.state.id = Number(this.id);
    this.loadPokemonWrapper();
  },
  mixins: [methods],
  methods: {
    async loadPokemonWrapper() {
      this.loading = true;
      try {
        await this.loadPokemon(String(this.$store.state.id)).then(pokemon => {
          this.pokemon = pokemon;
          this.loading = false;
        });
      } catch (error) {
        this.rerouteToPokedex();
      }
    }
  }
});
</script>
