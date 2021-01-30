<template>
  <div
    class="descriptions bg-primary rounded text-center p-2 cursor-pointer container"
    @click.self="nextDescription()"
  >
    <div class="row">
      <div class="col-1">
        <button
          class="left btn btn-outline-light d-inline-block"
          @click.self="previousDescription()"
          title="Turn pokemon around"
        >
          ◄
        </button>
      </div>
      <div class="col">
        <h5 class="text-white" @click.self="nextDescription()">
          Description
        </h5>
        <p class="p-0 m-0" @click.self="nextDescription()">
          {{ flavourTextToDisplay.flavor_text }}
        </p>
        <small
          >#{{ index + 1 }}/{{ flavourTexts.length }} ({{
            flavourTextToDisplay.version.name
          }})</small
        >
      </div>
      <div class="col-1">
        <button
          class="right btn btn-outline-light d-inline-block"
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
      if (Number(this.index) === this.flavourTexts.length - 1) {
        this.index = 0;
      } else {
        this.index++;
      }
    },
    previousDescription() {
      if (Number(this.index) === 0) {
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
      opacity: 0.5;
      &:hover {
        opacity: 1;
      }
    }
  }
  button {
    transition: all 0.25s ease-in-out;
    opacity: 0.25;
    height: 100%;
  }
}
</style>
