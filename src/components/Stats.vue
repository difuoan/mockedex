<template>
  <div class="stats bg-secondary border rounded container py-3">
    <h5 class="text-white">Stats</h5>
    <div class="row px-2">
      <div
        v-for="stat in stats"
        :class="`col-${12 / stats.length} p-0`"
        :key="`pokemon_stat_${stat.stat.name}`"
      >
        <div class="bg-white rounded position-relative statWrapper">
          <div
            class="bg-primary rounded position-absolute statBlock slideUpOnLoad"
            :style="`height: ${(stat.base_stat / 255) * 100}px;`"
          >
            <small v-if="(stat.base_stat / 255) * 100 > 20" class="text-white"
              >{{ Math.floor((stat.base_stat / 255) * 100) }}%</small
            >
          </div>
        </div>
        <b class="d-block">{{ stat.base_stat }}</b>
        <small class="d-block">{{ stat.stat.name }}</small>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
/**
 * displays the passed stat values and calculates the percentage relative to the max-value
 */
export default defineComponent({
  name: "Stats",
  props: {
    stats: {
      type: Array,
      required: true
    }
  }
});
</script>

<style scoped lang="scss">
.statWrapper {
  width: 66%;
  height: 106px;
  margin: auto;
  padding: 3px;
  .statBlock {
    transform-origin: 50% 100%;
    width: calc(100% - 6px);
    bottom: 3px;
  }
}
</style>
