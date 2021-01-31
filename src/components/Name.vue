<template>
  <transition name="fade" mode="out-in">
    <span class="name" v-if="loaded">{{
      getValueByLanguage(internalName.names)[0].name
    }}</span>
    <span v-else>
      <Spinner class="position-absolute" />
      <span class="opacity-0">{{ name }}</span>
    </span>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Spinner from "./Spinner.vue";
import methods from "../mixins/methods";
interface Name {
  url: string;
  name: string;
  names: [
    {
      name: string;
      language: {
        name: string;
        url: string;
      };
    }
  ];
}

export default defineComponent({
  name: "Name",
  data() {
    return {
      internalName: {} as () => Name,
      loaded: false
    };
  },
  mixins: [methods],
  components: {
    Spinner
  },
  props: {
    name: {
      type: String,
      required: true
    }
  },
  async mounted() {
    const pokemonSpecies = await this.axios.get(
      `${this.$store.state.apiUrl}/pokemon-species/${this.name}`
    );
    this.internalName = pokemonSpecies.data;
    this.loaded = true;
  }
});
</script>
