<template>
  <div class="wrapper">
    <button
      class="btn btn-primary float-left"
      v-if="$store.state.id > 0"
      @click="back()"
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
    <button class="btn btn-primary float-right" @click="next()" title="Next">
      ►
    </button>
    <button
      class="btn btn-primary mx-auto mb-3 d-block"
      @click="rerouteToPokedex()"
      title="Back to pokédex"
    >
      ▲
    </button>
    <div class="clear"></div>
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
  name: "PokemonWrapper",
  mixins: [methods],
  methods: {
    back() {
      this.$store.state.id--;
      if (this.$store.state.id <= this.$store.state.offset) {
        this.$store.state.offset =
          this.$store.state.offset - this.$store.state.limit;
      }
      this.updateRoute();
    },
    next() {
      this.$store.state.id++;
      if (
        this.$store.state.id >
        this.$store.state.offset + this.$store.state.limit
      ) {
        this.$store.state.offset =
          this.$store.state.offset + this.$store.state.limit;
      }
      this.updateRoute();
    },
    updateRoute() {
      this.$router.push({
        name: "Pokemon",
        params: { id: this.$store.state.id }
      });
    }
  }
});
</script>
