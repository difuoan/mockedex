<template>
  <div class="pokemonImage">
    <div class="position-relative">
      <button
        v-if="displayButtons"
        class="imageButton left btn btn-outline-secondary position-absolute top-50"
        @click="nextImage()"
        title="Turn pokemon around"
      >
        ◄
      </button>
      <Image :src="`${sprites[currentImage]}`" class="px-4 mx-3" />
      <button
        v-if="displayButtons"
        class="imageButton right btn btn-outline-secondary position-absolute top-50"
        @click="nextImage()"
        title="Turn pokemon around"
      >
        ►
      </button>
    </div>
    <button
      v-if="displayButtons"
      :class="`btn btn-${isShiny() ? 'primary' : 'outline-secondary'} mx-1`"
      @click="shinyImage()"
      :title="`Show ${isShiny() ? 'default' : 'shiny'} version`"
    >
      ☼
    </button>
    <button
      v-if="sprites['front_female'] && displayButtons"
      :class="`btn btn-outline-secondary mx-1`"
      @click="swapGender()"
      :title="`Show ${isFemale() ? 'male' : 'female'} version`"
    >
      {{ isFemale() ? "♀" : "♂" }}
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Image from "../components/Image.vue";

export default defineComponent({
  name: "PokemonImage",
  data() {
    return {
      currentImage: "front_default"
    };
  },
  components: {
    Image
  },
  props: {
    sprites: {
      type: Object,
      required: true
    },
    displayButtons: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  methods: {
    isShiny() {
      return this.currentImage.includes("shiny");
    },
    isFemale() {
      return this.currentImage.includes("female");
    },
    isBack() {
      return this.currentImage.includes("back");
    },
    nextImage() {
      const back = this.isBack();
      const female = this.isFemale();
      const shiny = this.isShiny();
      if (back === true) {
        if (shiny === true) {
          if (female === true) {
            this.currentImage = "front_shiny_female";
          } else {
            this.currentImage = "front_shiny";
          }
        } else {
          if (female === true) {
            this.currentImage = "front_female";
          } else {
            this.currentImage = "front_default";
          }
        }
      } else {
        if (shiny === true) {
          if (female === true) {
            this.currentImage = "back_shiny_female";
          } else {
            this.currentImage = "back_shiny";
          }
        } else {
          if (female === true) {
            this.currentImage = "back_female";
          } else {
            this.currentImage = "back_default";
          }
        }
      }
    },
    shinyImage() {
      const back = this.isBack();
      const female = this.isFemale();
      const shiny = this.isShiny();
      if (back === true) {
        if (shiny === true) {
          if (female === true) {
            this.currentImage = "back_female";
          } else {
            this.currentImage = "back_default";
          }
        } else {
          if (female === true) {
            this.currentImage = "back_shiny_female";
          } else {
            this.currentImage = "back_shiny";
          }
        }
      } else {
        if (shiny === true) {
          if (female === true) {
            this.currentImage = "front_female";
          } else {
            this.currentImage = "front_default";
          }
        } else {
          if (female === true) {
            this.currentImage = "front_shiny_female";
          } else {
            this.currentImage = "front_shiny";
          }
        }
      }
    },
    swapGender() {
      const back = this.isBack();
      const female = this.isFemale();
      const shiny = this.isShiny();
      if (back === true) {
        if (shiny === true) {
          if (female === true) {
            this.currentImage = "back_shiny";
          } else {
            this.currentImage = "back_shiny_female";
          }
        } else {
          if (female === true) {
            this.currentImage = "back_default";
          } else {
            this.currentImage = "back_female";
          }
        }
      } else {
        if (shiny === true) {
          if (female === true) {
            this.currentImage = "front_shiny";
          } else {
            this.currentImage = "front_shiny_female";
          }
        } else {
          if (female === true) {
            this.currentImage = "front_default";
          } else {
            this.currentImage = "front_female";
          }
        }
      }
    }
  }
});
</script>

<style scoped lang="scss">
.imageButton {
  z-index: 999;

  &.left {
    left: 1rem;
  }

  &.right {
    right: 1rem;
  }
}
</style>
