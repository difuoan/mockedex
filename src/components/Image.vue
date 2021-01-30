<template>
  <div class="image imagePlaceholder position-relative m-auto">
    <img
      :src="src"
      @load="onLoaded()"
      :style="`width: ${width}; height: ${height};`"
      class="fadeIn"
    />
    <div v-if="loaded === false" class="spinnerWrapper fadeIn rounded p-4">
      <div class="spinner-border text-primary" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Image",
  data: function() {
    return {
      loaded: false
    };
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
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 0.75);
}
</style>
