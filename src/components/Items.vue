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
              class="d-inline"
            />{{ getValueByLanguage(item.names)[0].name }}</span
          >{{
            index + 2 >= internalItems.length
              ? index + 1 >= internalItems.length
                ? ""
                : " & "
              : ", "
          }}
        </div>
      </div>
      <Spinner v-else />
    </transition>
  </div>
</template>

<script lang="ts">
import methods from "../mixins/methods";
import { defineComponent } from "vue";
import { AxiosPromise, AxiosResponse } from "axios";
import Spinner from "../components/Spinner.vue";
import Image from "../components/Image.vue";
interface Item {
  item: {
    name: string;
    url: string;
    sprites: {
      url: string;
    };
  };
}

export default defineComponent({
  name: "Items",
  mixins: [methods],
  props: {
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
      internalItems: [] as Array<Item>,
      loaded: false
    };
  },
  async mounted() {
    const itemsPromises: Array<AxiosPromise> = this.items.map((item: Item) =>
      this.axios.get(item.item.url)
    );
    const items: Array<AxiosResponse> = await this.axios.all(itemsPromises);
    this.internalItems = items.map(response => response.data);
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
