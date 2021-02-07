<template>
  <div class="languages">
    <select
      name="languages"
      v-model="$store.state.language"
      class="p-1 rounded d-inline-block"
    >
      <option
        v-for="language in languages"
        :value="language.index"
        :key="`language_${language.index}`"
        >{{ language.name }}</option
      >
    </select>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
// TODO: add languages for the interface texts or replace them with icons
// TODO: find out which languages are actually fully supported and only make thise available
// TODO: move the languages array somewhere else where it won't get duplicated for every instance of this component
/**
 * updates the store with the chosen language
 */
export default defineComponent({
  name: "Languages",
  data() {
    return {
      /**
       * the languages we think we support
       */
      languages: [
        { index: "fr", name: "🇫🇷" },
        { index: "de", name: "🇩🇪" },
        { index: "es", name: "🇪🇸" },
        { index: "en", name: "🇬🇧" },
        { index: "it", name: "🇮🇹" }
      ]
    };
  }
});
</script>
