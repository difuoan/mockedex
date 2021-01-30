<template>
  <div class="abilities bg-secondary border rounded container py-3">
    <h5 class="text-white">Abilities</h5>
    <span
      v-for="(ability, index) in abilities"
      :key="`ability_${ability.name}`"
      class="cursor-help"
      :title="getValueByLanguage(ability.flavor_text_entries)[0].flavor_text"
      >{{ getValueByLanguage(ability.names)[0].name
      }}{{
        index + 2 >= abilities.length
          ? index + 1 >= abilities.length
            ? ""
            : " & "
          : ", "
      }}</span
    >
  </div>
</template>

<script lang="ts">
import methods from "../mixins/methods";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Abilities",
  mixins: [methods],
  props: {
    abilities: {
      type: Array,
      required: true
    }
  }
});
</script>
