<template>
  <div class="stats bg-secondary border rounded container py-3">
    <h5 class="text-white">Stats</h5>
    <transition name="fade" mode="out-in">
      <div v-if="loading === false">
        <div class="row px-2">
          <div
            v-for="(stat, index) in internalStats"
            :class="`col-${12 / internalStats.length} p-0`"
            :key="`pokemon_stat_${stat.name}`"
          >
            <div class="bg-white rounded position-relative statWrapper">
              <div
                class="rounded position-absolute statBlock slideUpOnLoad"
                :style="`height: ${statPercent(stats[index].base_stat)}px;`"
              >
                <small
                  v-if="statPercent(stats[index].base_stat) > 20"
                  class="text-white text-stroke"
                  >{{ Math.floor(statPercent(stats[index].base_stat)) }}%</small
                >
              </div>
            </div>
            <b class="d-block my-1">{{ stats[index].base_stat }}</b>
            <small class="d-block statName m-auto">{{
              getValueByLanguage(stat.names)[0].name
            }}</small>
          </div>
        </div>
      </div>
      <div class="position-relative" v-else>
        <Spinner class="left-50 translate-x-m-50" />
        <span>&nbsp;</span>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import methods from "../mixins/methods";
import { defineComponent } from "vue";
import Spinner from "../components/Spinner.vue";
import { AxiosPromise, AxiosResponse } from "axios";
/**
 * displays the passed stat values and calculates the percentage relative to the max-value
 */
export default defineComponent({
  name: "Stats",
  data() {
    return {
      loading: true,
      internalStats: [] as Array<Stat>
    };
  },
  methods: {
    statPercent(stat: number) {
      return (stat / 255) * 100;
    }
  },
  mixins: [methods],
  components: {
    Spinner
  },
  props: {
    stats: {
      type: Array as () => Array<Stat>,
      required: true
    }
  },
  async mounted() {
    // create requests to get each move
    const movesPromises: Array<AxiosPromise> = this.stats.map((stat: Stat) => {
      return this.axios.get(stat.stat.url) as AxiosPromise;
    });
    // handle all the requests at the same time
    const moves: Array<AxiosResponse> = await this.axios.all(movesPromises);
    // save the moves
    this.internalStats = moves.map(response => response.data as Stat);
    // hide the loading-spinner
    this.loading = false;
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
    background: rgb(22, 255, 0);
    background: linear-gradient(
      0deg,
      rgba(255, 0, 0, 1) 0px,
      rgba(255, 128, 0, 1) 25px,
      rgba(22, 255, 0, 1) 50px,
      rgba(241, 255, 0, 1) 75px
    );
  }
}
.statName {
  writing-mode: vertical-rl;
  text-orientation: mixed;
}
</style>
