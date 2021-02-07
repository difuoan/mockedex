<template>
  <div class="abilities bg-secondary border rounded container py-3">
    <h5 class="text-white">Abilities</h5>
    <transition name="fade" mode="out-in">
      <div v-if="loading === false">
        <div
          class="d-inline"
          v-for="(ability, index) in internalAbilities"
          :key="`ability_${ability.name}`"
        >
          <span
            class="cursor-help transition-025"
            :title="
              getValueByLanguage(ability.flavor_text_entries)[0].flavor_text
            "
            >{{ getValueByLanguage(ability.names)[0].name }}</span
          >{{ ampersandOrCommaSeperator(index, internalAbilities.length) }}
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
import { AxiosPromise, AxiosResponse } from "axios";
import Spinner from "../components/Spinner.vue";
/**
 * displays translated abilities based on the passed array
 */
export default defineComponent({
  name: "Abilities",
  mixins: [methods],
  props: {
    /**
     * we use this array to load the actual translated abilities
     */
    abilities: {
      type: Array as () => Array<Ability>,
      required: true
    }
  },
  components: {
    Spinner
  },
  data() {
    return {
      /**
       * the actual translated abilities
       */
      internalAbilities: [] as Array<Ability>,
      loading: true // display the loading-spinner or not
    };
  },
  async mounted() {
    // create requests to load the extended abilities based on the passed array
    const abilitiesPromises: Array<AxiosPromise> = this.abilities.map(
      (ability: Ability) => this.axios.get(ability.ability.url)
    );
    // handle all the created requests at the same time
    const abilities: Array<AxiosResponse> = await this.axios.all(
      abilitiesPromises
    );
    // save the response.data as our extended abilities
    this.internalAbilities = abilities.map(response => response.data);
    // disable the loading-spinner
    this.loading = false;
  }
});
</script>

<style lang="scss" scoped>
span {
  &:hover {
    color: white;
  }
}
</style>
