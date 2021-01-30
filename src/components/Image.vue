<template>
  <div class="image imagePlaceholder position-relative m-auto">
    <img
      :src="src"
      @load="onLoaded()"
      :style="`width: ${width}; height: ${height};`"
      class="fadeIn"
    />
    <div
      v-if="loaded === false"
      :class="
        `spinnerWrapper ${
          withBg ? 'withBg' : ''
        } fadeIn rounded p-4 top-50 left-50`
      "
    >
      <Spinner />
    </div>
  </div>
</template>

<script lang="ts">
import Spinner from "../components/Spinner.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Image",
  data: function() {
    return {
      loaded: false
    };
  },
  components: {
    Spinner
  },
  props: {
    src: {
      type: String,
      required: true
    },
    width: {
      type: String,
      required: false,
      default: "100%"
    },
    height: {
      type: String,
      required: false,
      default: "auto"
    },
    withBg: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  watch: {
    "$props.src"() {
      if (this.isCached === false) {
        this.loaded = false;
      }
    }
  },
  computed: {
    isCached() {
      const image = new Image(); // create a new image
      image.src = this.src; // check whether the image is already complete
      return image.complete; // if the browser has the image stored in the cache it will be ready immediately
    }
  },
  methods: {
    onLoaded() {
      this.loaded = true;
    }
  }
});
</script>

<style lang="scss" scoped>
.imagePlaceholder {
  width: 257px;
  height: 257px;
}
.spinnerWrapper {
  transform: translate(-50%, -50%);
  &.withBg {
    background: rgba(255, 255, 255, 0.75);
  }
}
</style>
