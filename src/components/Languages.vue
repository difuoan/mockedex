<template>
  <div class="languages">
    <select
      name="languages"
      v-model="$store.state.language"
      class="p-1 rounded d-inline-block"
    >
      <option
        v-for="language in languages"
        :value="language"
        :key="`language_${language}`"
        >{{ language }}</option
      >
    </select>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Languages",
  data() {
    return {
      languages: ["fr", "de", "es", "it", "en", "ja"]
    };
  }
});
</script>
