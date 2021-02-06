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
          >{{
            index + 2 >= internalAbilities.length
              ? index + 1 >= internalAbilities.length
                ? ""
                : " & "
              : ", "
          }}
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

export default defineComponent({
  name: "Abilities",
  mixins: [methods],
  props: {
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
      internalAbilities: [] as Array<Ability>,
      loading: true
    };
  },
  async mounted() {
    // TODO: add error-handling to all the requests
    const abilitiesPromises: Array<AxiosPromise> = this.abilities.map(
      (ability: Ability) => this.axios.get(ability.ability.url)
    );
    const abilities: Array<AxiosResponse> = await this.axios.all(
      abilitiesPromises
    );
    this.internalAbilities = abilities.map(response => response.data);
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
