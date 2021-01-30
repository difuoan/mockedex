<template>
  <div class="wrapper">
    <div class="row">
      <div class="col-3">
        <button
          class="btn btn-primary float-left"
          v-if="$store.state.offset > 0"
          @click="previousPokemons()"
          title="Back"
        >
          Back
        </button>
        <button
          v-else
          title="Back"
          class="btn btn-primary float-left"
          disabled="disabled"
        >
          Back
        </button>
      </div>
      <div :class="`col-6 ${shakeSearch === true ? 'shake' : ''}`">
        <div class="input-group mb-3">
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
      <div class="col-3">
        <button
          title="Next"
          class="btn btn-primary float-right"
          @click="nextPokemons()"
        >
          Next
        </button>
      </div>
    </div>
    <router-view v-slot="routerParams">
      <transition name="fade" mode="out-in">
        <component :is="routerParams.Component"></component>
      </transition>
    </router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import methods from "../mixins/methods";

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
    async search() {
      if (String(this.pokemonToSearch).length <= 0) {
        this.hintAtSearchError();
        return false;
      }
      try {
        const pokemon = await this.loadPokemon(
          String(this.pokemonToSearch).replace(/^0+/g, "") // replace leading zeros
        );
        this.$store.state.id = pokemon.id;
        this.$router.push({ name: "Pokemon", params: { id: pokemon.id } });
      } catch (error) {
        this.hintAtSearchError();
      }
    },
    hintAtSearchError() {
      this.shakeSearch = true;
      window.setTimeout(() => {
        this.shakeSearch = false;
      }, 2000);
    }
  }
});
</script>
