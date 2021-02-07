<template>
  <div class="wrapper">
    <!-- back button -->
    <button
      class="btn btn-primary float-left"
      v-if="$store.state.id > 1"
      @click="previous()"
      title="Back"
    >
      ◄
    </button>
    <button
      v-else
      class="btn btn-primary float-left"
      disabled="disabled"
      title="Back"
    >
      ◄
    </button>
    <!-- next button -->
    <button class="btn btn-primary float-right" @click="next()" title="Next">
      ►
    </button>
    <!-- to pokedex button -->
    <button
      class="btn btn-primary mx-auto mb-3 d-block"
      @click="back()"
      title="Back to pokédex"
    >
      ▲
    </button>
    <div class="clear"></div>
    <!-- router-view -->
    <router-view v-slot="routerParams">
      <transition name="fade" mode="out-in">
        <keep-alive include="Pokemon">
          <component
            :is="routerParams.Component"
            :key="$store.state.id"
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
 * just a wrapper for the pokemon-component so the buttons "at the top of the pokemon-view" won't get affected by the transitions of the changing pokemon-component
 */
export default defineComponent({
  name: "PokemonWrapper",
  mixins: [methods],
  methods: {
    /**
     * makes sure the (store.state.)offset is still fine and then re-routes to the previous pokemon
     */
    previous() {
      // set the state
      this.$store.state.id--;
      // check whether the (store.state.)offset is within bounds
      if (
        this.$store.state.id <= this.$store.state.offset ||
        this.stateIsValid === false
      ) {
        // fix the (store.state.)offset
        this.$store.state.offset =
          this.$store.state.offset - this.$store.state.limit;
      }
      // reroute to the previous pokemon
      this.rerouteToPokemon();
    },
    /**
     * makes sure the (store.state.)offset is still fine and then re-routes to the next pokemon
     */
    next() {
      // set the state
      this.$store.state.id++;
      // check whether the (store.state.)offset is within bounds
      if (
        this.$store.state.id >
          this.$store.state.offset + this.$store.state.limit ||
        this.stateIsValid === false
      ) {
        // fix the (store.state.)offset
        this.$store.state.offset =
          this.$store.state.offset + this.$store.state.limit;
      }
      // reroute to the next pokemon
      this.rerouteToPokemon();
    },
    /**
     * makes sure the (store.state.)offset is still fine and then re-routes to the pokedex
     */
    back() {
      // check whether the (store.state.)offset is within bounds
      if (
        this.$store.state.id <= this.$store.state.offset ||
        this.$store.state.id >
          this.$store.state.offset + this.$store.state.limit ||
        this.stateIsValid === false
      ) {
        // fix the (store.state.)offset
        this.$store.state.offset = this.$store.state.id - 1;
      }
      // reroute to the pokedex
      this.rerouteToPokedex();
    }
  }
});
</script>
