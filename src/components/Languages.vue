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
        :key="`language_${language.id}`"
        >{{ language.name }}</option
      >
    </select>
  </div>
</template>

<script lang="ts">
import languages from "../mixins/languages";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Languages",
  mixins: [languages]
});
</script>
