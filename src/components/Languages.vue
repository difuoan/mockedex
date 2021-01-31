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
// TODO: add languages for the interface texts
export default defineComponent({
  name: "Languages",
  data() {
    return {
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
