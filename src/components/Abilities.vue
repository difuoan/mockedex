<template>
  <div class="abilities bg-secondary border rounded container py-3">
    <h5 class="text-white">Abilities</h5>
    <span
      v-for="(ability, index) in abilities"
      :key="`ability_${ability.ability.name}`"
      >{{ ability.ability.name
      }}{{
        index + 2 >= abilities.length
          ? index + 1 >= abilities.length
            ? ""
            : " and "
          : ", "
      }}</span
    >
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Abilities",
  props: {
    abilities: {
      type: Array,
      required: true
    }
  }
});
</script>
