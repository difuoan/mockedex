<template>
  <div class="notFound bg-white rounded border p-4">
    <h3 class="p-0 m-0 pb-4">Sorry, we couldn't catch that one...</h3>
    <button
      class="btn btn-primary btn-block"
      @click="rerouteToPokedexWrapper()"
    >
      ▲
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import methods from "../mixins/methods";

export default defineComponent({
  name: "NotFound",
  mixins: [methods],
  methods: {
    rerouteToPokedexWrapper() {
      this.$store.state.offset = 0;
      this.$store.state.limit = 4;
      this.rerouteToPokedex();
    }
  }
});
</script>
