<template>
  <div
    class="descriptions bg-primary rounded text-center cursor-pointer container p-0 m-0"
    @click.self="nextDescription()"
  >
    <div class="row p-0 m-0">
      <div class="col-1 p-0 m-0 text-left">
        <button
          class="left btn btn-outline-light d-inline-block transition-025 h-100 opacity-025"
          @click.self="previousDescription()"
          title="Turn pokemon around"
        >
          ◄
        </button>
      </div>
      <div class="col">
        <h5
          class="text-white d-inline-block mt-3"
          @click.self="nextDescription()"
        >
          Description
        </h5>
        <p class="p-0 m-0" @click.self="nextDescription()">
          {{ flavourTextToDisplay.flavor_text }}
        </p>
        <small class="d-inline-block mb-3"
          >#{{ index + 1 }}/{{ flavourTexts.length }} ({{
            flavourTextToDisplay.version.name
          }})</small
        >
      </div>
      <div class="col-1 p-0 m-0 text-right">
        <button
          class="right btn btn-outline-light d-inline-block transition-025 h-100 opacity-025"
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
interface FlavourText {
  flavor_text: string;
  version: {
    name: string;
    url: string;
  };
}
export default defineComponent({
  name: "Descriptions",
  data() {
    return {
      index: 0
    };
  },
  props: {
    flavourTexts: {
      type: Array as () => Array<FlavourText>,
      required: true
    }
  },
  computed: {
    flavourTextToDisplay(): FlavourText {
      const flavourTextObject = Object.assign(
        {},
        this.flavourTexts[this.index]
      ) as FlavourText;
      return flavourTextObject;
    }
  },

  methods: {
    nextDescription() {
      if (Number(this.index) >= this.flavourTexts.length - 1) {
        this.index = 0;
      } else {
        this.index++;
      }
    },
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
