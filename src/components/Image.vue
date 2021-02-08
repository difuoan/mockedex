<template>
  <div
    class="image imagePlaceholder position-relative m-auto"
    :style="`width: ${width}; height: ${height};`"
  >
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
/**
 * displays an image based on the passed src
 */
export default defineComponent({
  name: "Image",
  data: function() {
    return {
      loaded: false // whether we display the loading-spinner or not
    };
  },
  components: {
    Spinner
  },
  props: {
    /**
     * the source of the image to display
     */
    src: {
      type: String,
      required: true
    },
    // optional with parameter (note the necessary unit value at the end)
    width: {
      type: String,
      required: false,
      default: "96px"
    },
    // optional height parameter (note the necessary unit value at the end)
    height: {
      type: String,
      required: false,
      default: "auto"
    },
    // optional bool to decide whether to display the background around the spinner or not
    withBg: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  watch: {
    /**
     * watch for changes in the image-src and display the loading-spinner if the image wasn't prepared by the browser yet
     */
    "$props.src"() {
      if (this.isCached === false) {
        this.loaded = false;
      }
    }
  },
  computed: {
    /**
     * check whether the current image was already prepared by the browser
     */
    isCached() {
      const image = new Image(); // create a new image
      image.src = this.src; // check whether the image is already complete
      return image.complete; // if the browser has the image stored in the cache it will be ready immediately
    }
  },
  methods: {
    /**
     * disables the loading-spinner once the image was loaded
     */
    onLoaded() {
      this.loaded = true;
    }
  }
});
</script>

<style lang="scss" scoped>
.imagePlaceholder {
  width: 96px;
  height: 96px;
}
.spinnerWrapper {
  transform: translate(-50%, -50%);
  &.withBg {
    background: rgba(255, 255, 255, 0.75);
  }
}
</style>
