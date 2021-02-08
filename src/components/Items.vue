<template>
  <div class="items bg-white border rounded p-3">
    <h5>Items</h5>
    <transition name="fade" mode="out-in">
      <div v-if="loaded === true">
        <div
          class="d-inline"
          v-for="(item, index) in internalItems"
          :key="`item_${item.name}`"
        >
          <span
            class="cursor-help transition-025"
            :title="getValueByLanguage(item.flavor_text_entries)[0].text"
          >
            <Image
              :src="item.sprites.default"
              :withBg="false"
              width="1.5rem"
              height="1.5rem"
              class="d-inline"
            />{{ getValueByLanguage(item.names)[0].name }}</span
          >{{ ampersandOrCommaSeperator(index, internalItems.length) }}
        </div>
      </div>
      <div v-else>
        <Spinner class="position-absolute" />
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
import Image from "../components/Image.vue";
/**
 * displays translated items based on the passed array
 */
export default defineComponent({
  name: "Items",
  mixins: [methods],
  props: {
    /**
     * we use this array to load the actual translated items
     */
    items: {
      type: Array as () => Array<Item>,
      required: true
    }
  },
  components: {
    Spinner,
    Image
  },
  data() {
    return {
      /**
       * the actual translated items
       */
      internalItems: [] as Array<Item>,
      loaded: false // display the loading-spinner or not
    };
  },
  async mounted() {
    // create requests to load the extended items based on the passed array
    const itemsPromises: Array<AxiosPromise> = this.items.map((item: Item) =>
      this.axios.get(item.item.url)
    );
    // handle all the created requests at the same time
    const items: Array<AxiosResponse> = await this.axios.all(itemsPromises);
    // save the response.data as our extended items
    this.internalItems = items.map(response => response.data);
    // disable the loading-spinner
    this.loaded = true;
  }
});
</script>

<style lang="scss" scoped>
@import "~bootstrap/scss/_functions.scss";
@import "../assets/scss/variables.scss";
span {
  &:hover {
    color: $primary;
  }
}
</style>
