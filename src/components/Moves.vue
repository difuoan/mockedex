<template>
  <div
    @click="movesAreOpen = !movesAreOpen"
    class="bg-secondary border rounded container py-3 moves cursor-pointer"
  >
    <h5 class="text-white text-center m-0">
      Moves {{ movesAreOpen ? "▲" : "▼" }}
    </h5>
    <div :class="`movesWrapper ${displayMovesClass} mt-2`">
      <ol class="text-left mb-0 transition-025" v-if="loaded">
        <li v-for="move in internalMoves" :key="`pokemon_move_${move.name}`">
          {{ getValueByLanguage(move.names)[0].name }}
        </li>
      </ol>
      <div v-else class="text-center">
        <br />
        <Spinner />
        <br />
        <br />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import methods from "../mixins/methods";
import { defineComponent } from "vue";
import { AxiosPromise, AxiosResponse } from "axios";
import Spinner from "../components/Spinner.vue";
export default defineComponent({
  name: "Moves",
  data() {
    return {
      movesAreOpen: false,
      loaded: false,
      internalMoves: [] as Array<Move>
    };
  },
  components: {
    Spinner
  },
  mixins: [methods],
  props: {
    moves: {
      type: Array as () => Array<Move>,
      required: true
    }
  },
  async mounted() {
    const movesPromises: Array<AxiosPromise> = this.moves.map((move: Move) => {
      return this.axios.get(move.move.url) as AxiosPromise;
    });
    const moves: Array<AxiosResponse> = await this.axios.all(movesPromises);
    this.internalMoves = moves.map(response => response.data as Move);
    this.loaded = true;
  },
  computed: {
    displayMovesClass() {
      if (this.movesAreOpen === true) {
        return "movesAreOpen";
      }
      return "movesAreClosed";
    }
  }
});
</script>

<style scoped lang="scss">
@import "~bootstrap/scss/_functions.scss";
@import "../assets/scss/variables.scss";
@import "~bootstrap/scss/_mixins.scss";
.moves {
  .movesWrapper {
    height: auto;
    overflow-y: hidden;
    &.movesAreOpen {
      transition: all 0.5s ease-in;
      max-height: 500px;
      overflow-y: auto;
      ol,
      ul {
        transition-delay: 0.25s;
        opacity: 1;
      }
    }
    &.movesAreClosed {
      transition: all 0.5s ease-out;
      max-height: 0px;
      overflow: hidden;
      ol,
      ul {
        opacity: 0;
      }
    }

    ol,
    ul {
      columns: 1;
      @include media-breakpoint-up(sm) {
        columns: 2;
      }
      @include media-breakpoint-up(md) {
        columns: 3;
      }
      @include media-breakpoint-up(lg) {
        columns: 4;
      }
      @include media-breakpoint-up(xl) {
        columns: 5;
      }

      &li {
        list-style-position: inside;
        page-break-inside: avoid;
        break-inside: avoid;
      }
    }
  }
}
</style>
