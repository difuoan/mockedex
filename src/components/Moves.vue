<template>
  <div
    @click="movesAreOpen = !movesAreOpen"
    class="bg-secondary border rounded container py-3 mt-3 moves cursor-pointer"
  >
    <h5 class="text-white text-center m-0">
      Moves {{ movesAreOpen ? "▲" : "▼" }}
    </h5>
    <div :class="displayMovesClass">
      <ol class="text-left mt-2 mb-0">
        <li v-for="move in moves" :key="`pokemon_move_${move.move.name}`">
          {{ move.move.name }}
        </li>
      </ol>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Moves",
  data() {
    return {
      movesAreOpen: false
    };
  },
  props: {
    moves: {
      type: Array,
      required: true
    }
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
@import "~bootstrap/scss/_variables.scss";
@import "~bootstrap/scss/_mixins.scss";
.moves {
  div {
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
      transition: all 0.25s ease-in-out;
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
