<template>
  <div class="descriptions bg-primary rounded text-center container p-0 m-0">
    <div class="row p-0 m-0">
      <div class="col-1 p-0 m-0 text-left">
        <button
          class="left btn btn-outline-light d-inline-block cursor-pointer transition-025 h-100 opacity-025"
          @click.self="previousDescription()"
          title="Turn pokemon around"
        >
          ◄
        </button>
      </div>
      <div class="col">
        <h5
          class="text-white d-inline-block mt-3 cursor-pointer"
          @click.self="nextDescription()"
        >
          Description
        </h5>
        <p class="p-0 m-0 cursor-pointer" @click.self="nextDescription()">
          {{ flavourTextToDisplay.flavor_text }}
        </p>
        <small
          class="d-inline-block mb-3 cursor-pointer"
          @click.self="nextDescription()"
          >#{{ index + 1 }}/{{ flavourTexts.length }} ({{
            flavourTextToDisplay.version.name
          }})</small
        >
      </div>
      <div class="col-1 p-0 m-0 text-right">
        <button
          class="right btn btn-outline-light d-inline-block transition-025 h-100 opacity-025 cursor-pointer"
          @click.self="nextDescription()"
          title="Turn pokemon around"
        >
          ►
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
/**
 * displays one of the passed descriptions and makes the others available
 */
export default defineComponent({
  name: "Descriptions",
  data() {
    return {
      index: 0 // the index we use to choose the displayed description
    };
  },
  props: {
    /**
     * already translated flavourTexts we simply need to display
     */
    flavourTexts: {
      type: Array as () => Array<FlavourText>,
      required: true
    }
  },
  computed: {
    /**
     * simply get one of the flavourTexts in the currently specified (store.state.)language based on a changable index
     */
    flavourTextToDisplay(): FlavourText {
      const flavourTextObject = this.flavourTexts[this.index] as FlavourText;
      return flavourTextObject;
    }
  },
  methods: {
    /**
     * restarts of increases the index used to display the description
     */
    nextDescription() {
      if (Number(this.index) >= this.flavourTexts.length - 1) {
        this.index = 0;
      } else {
        this.index++;
      }
    },
    /**
     * restarts of decreases the index used to display the description
     */
    previousDescription() {
      if (Number(this.index) <= 0) {
        this.index = this.flavourTexts.length - 1;
      } else {
        this.index--;
      }
    }
  }
});
</script>

<style lang="scss" scoped>
.descriptions {
  &:hover {
    button {
      opacity: 0.75;
      &:hover {
        opacity: 1;
      }
    }
  }
}
</style>
