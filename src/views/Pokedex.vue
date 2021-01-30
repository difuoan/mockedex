<template>
  <div class="pokedex">
    <div class="clear"></div>
    <div class="position-relative pt-3">
      <transition name="fade" mode="out-in">
        <div v-if="loading === false" class="mb-4 pb-4">
          <div class="row justify-content-md-center">
            <div
              v-for="pokemon in pokemons"
              :key="`pokemon_card_${pokemon.id}`"
              class="col-12 col-sm-6 col-md-4 col-lg-3 mb-3"
              @click="rerouteToPokemonView(pokemon.id)"
              :title="pokemon.name"
            >
              <div class="card">
                <small class="mt-3">
                  #{{ pad(String(pokemon.id), 4, "0", true) }}
                </small>
                <Image
                  :src="pokemon.sprites['front_default']"
                  class="card-img-top"
                />
                <div class="card-body pt-0">
                  <h5 class="card-title p-0 text-bold">
                    {{ pokemon.name }}
                  </h5>
                  <Types :types="pokemon.types" />
                </div>
              </div>
            </div>
          </div>
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
                <div class="input-group-prepend">
                  <label class="input-group-text" for="limit">Limit</label>
                </div>
                <select
                  class="custom-select"
                  id="limit"
                  v-model="$store.state.limit"
                  @change="loadPokemons"
                >
                  <option value="4">4</option>
                  <option value="8">8</option>
                  <option value="16">16</option>
                  <option value="32">32</option>
                  <option value="64">64</option>
                </select>
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
        </div>
        <div
          v-else
          class="mainSpinner spinner-border text-primary"
          role="status"
        >
          <span class="sr-only">Loading...</span>
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import "../mixins/interfaces";
import methods from "../mixins/methods";
import Image from "../components/Image.vue";
import Types from "../components/Types.vue";
import { AxiosPromise, AxiosResponse } from "axios";

export default defineComponent({
  name: "Pokedex",
  data() {
    return {
      pokemons: new Array<Pokemon>(),
      loading: true,
      pokemonToSearch: "",
      shakeSearch: false
    };
  },
  components: {
    Image,
    Types
  },
  mixins: [methods],
  async mounted() {
    await this.loadPokemons();
  },
  watch: {
    "$store.state.limit": async function() {
      await this.loadPokemons();
    },
    "$store.state.offset": async function() {
      await this.loadPokemons();
    }
  },
  methods: {
    async loadPokemons() {
      this.loading = true;
      const result = await this.axios.get(
        `${this.$store.state.apiUrl}/pokemon?limit=${this.$store.state.limit}&offset=${this.$store.state.offset}`
      );
      const urlArray = result.data.results.map(
        (result: { name: string }) => result.name
      );
      const promiseArray = urlArray.map((name: string) =>
        this.axios.get(`${this.$store.state.apiUrl}/pokemon/${name}`)
      ) as Array<AxiosPromise>;
      this.axios.all(promiseArray).then((responses: Array<AxiosResponse>) => {
        this.pokemons = responses.map(
          response => response.data as Pokemon
        ) as Array<Pokemon>;
        this.loading = false;
      });
    },
    rerouteToPokemonView(id: number) {
      this.$store.state.id = id;
      this.$router.push({
        name: "Pokemon",
        params: {
          id: id
        }
      });
    },
    async search() {
      try {
        const result = await this.axios.get(
          `${this.$store.state.apiUrl}/pokemon/${String(
            this.pokemonToSearch
          ).toLowerCase()}`
        );
        if (result.status === 200) {
          const pokemon = result.data as Pokemon;
          this.$store.state.id = pokemon.id;
          this.$router.push({ name: "Pokemon", params: { id: pokemon.id } });
        }
      } catch (error) {
        this.shakeSearch = true;
        window.setTimeout(() => {
          this.shakeSearch = false;
        }, 2000);
      }
    }
  }
});
</script>

<style scoped lang="scss">
.card {
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
