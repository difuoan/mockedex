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
              <div class="position-relative">
                <button
                  class="imageButton left btn btn-outline-secondary position-absolute top-50"
                  @click="nextImage()"
                  title="Turn pokemon around"
                >
                  ◄
                </button>
                <Image
                  :src="`${pokemon.sprites[currentImage]}`"
                  class="px-4 mx-3"
                />
                <button
                  class="imageButton right btn btn-outline-secondary position-absolute top-50"
                  @click="nextImage()"
                  title="Turn pokemon around"
                >
                  ►
                </button>
              </div>
              <button
                :class="
                  `btn btn-${isShiny() ? 'primary' : 'outline-secondary'} mx-1`
                "
                @click="shinyImage()"
                :title="`Show ${isShiny() ? 'default' : 'shiny'} version`"
              >
                ☼
              </button>
              <button
                v-if="pokemon.sprites['front_female']"
                :class="`btn btn-outline-secondary mx-1`"
                @click="swapGender()"
                :title="`Show ${isFemale() ? 'male' : 'female'} version`"
              >
                {{ isFemale() ? "♀" : "♂" }}
              </button>
            </div>
            <div class="col-12 col-md-6 col-lg-4 text-center mb-3">
              <div class="bg-primary border rounded container py-3">
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
              <div
                v-if="pokemon.held_items.length > 0"
                class="bg-white border rounded mt-3 p-3"
              >
                <b>Item{{ pokemon.held_items.length > 1 ? "s" : "" }}:</b>
                <span
                  v-for="(item, index) in pokemon.held_items"
                  :key="`pokemon_item_${item.item.name}`"
                  >&nbsp;{{ item.item.name
                  }}{{
                    index + 1 === pokemon.held_items.length ? "" : ","
                  }}</span
                >
              </div>
            </div>
            <div class="col-12 col-md-6 col-lg-4 text-center mb-3">
              <Stats :stats="pokemon.stats" class="mb-3" />
              <Abilities :abilities="pokemon.abilities" />
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
import Image from "../components/Image.vue";
import Stats from "../components/Stats.vue";
import Moves from "../components/Moves.vue";
import Types from "../components/Types.vue";
import Abilities from "../components/Abilities.vue";
import Descriptions from "../components/Descriptions.vue";

export default defineComponent({
  name: "Pokemon",
  data() {
    return {
      currentImage: "front_default",
      pokemon: {} as Pokemon,
      loading: true
    };
  },
  components: {
    Image,
    Stats,
    Moves,
    Types,
    Abilities,
    Descriptions
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  watch: {
    "$store.state.id": function() {
      this.currentImage = "front_default";
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
    },
    isShiny() {
      return this.currentImage.includes("shiny");
    },
    isFemale() {
      return this.currentImage.includes("female");
    },
    isBack() {
      return this.currentImage.includes("back");
    },
    nextImage() {
      const back = this.isBack();
      const female = this.isFemale();
      const shiny = this.isShiny();
      if (back === true) {
        if (shiny === true) {
          if (female === true) {
            this.currentImage = "front_shiny_female";
          } else {
            this.currentImage = "front_shiny";
          }
        } else {
          if (female === true) {
            this.currentImage = "front_female";
          } else {
            this.currentImage = "front_default";
          }
        }
      } else {
        if (shiny === true) {
          if (female === true) {
            this.currentImage = "back_shiny_female";
          } else {
            this.currentImage = "back_shiny";
          }
        } else {
          if (female === true) {
            this.currentImage = "back_female";
          } else {
            this.currentImage = "back_default";
          }
        }
      }
    },
    shinyImage() {
      const back = this.isBack();
      const female = this.isFemale();
      const shiny = this.isShiny();
      if (back === true) {
        if (shiny === true) {
          if (female === true) {
            this.currentImage = "back_female";
          } else {
            this.currentImage = "back_default";
          }
        } else {
          if (female === true) {
            this.currentImage = "back_shiny_female";
          } else {
            this.currentImage = "back_shiny";
          }
        }
      } else {
        if (shiny === true) {
          if (female === true) {
            this.currentImage = "front_female";
          } else {
            this.currentImage = "front_default";
          }
        } else {
          if (female === true) {
            this.currentImage = "front_shiny_female";
          } else {
            this.currentImage = "front_shiny";
          }
        }
      }
    },
    swapGender() {
      const back = this.isBack();
      const female = this.isFemale();
      const shiny = this.isShiny();
      if (back === true) {
        if (shiny === true) {
          if (female === true) {
            this.currentImage = "back_shiny";
          } else {
            this.currentImage = "back_shiny_female";
          }
        } else {
          if (female === true) {
            this.currentImage = "back_default";
          } else {
            this.currentImage = "back_female";
          }
        }
      } else {
        if (shiny === true) {
          if (female === true) {
            this.currentImage = "front_shiny";
          } else {
            this.currentImage = "front_shiny_female";
          }
        } else {
          if (female === true) {
            this.currentImage = "front_default";
          } else {
            this.currentImage = "front_female";
          }
        }
      }
    }
  }
});
</script>

<style scoped lang="scss">
.imageButton {
  z-index: 999;

  &.left {
    left: 1rem;
  }

  &.right {
    right: 1rem;
  }
}
</style>
