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
      <Image
        :src="`${sprites[currentImage]}`"
        class="mx-3"
        :width="width"
        :height="height"
      />
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
      :class="`btn btn-${isShiny() ? 'warning' : 'secondary'} mx-1`"
      @click="shinyImage()"
      :title="`Show ${isShiny() ? 'default' : 'shiny'} version`"
    >
      ☼
    </button>
    <button
      v-if="sprites['front_female'] && displayButtons"
      :class="`btn btn-${isFemale() ? 'pink' : 'lightblue'} mx-1 `"
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
/**
 * displays the pokemon in all its forms which can be chosen
 */
export default defineComponent({
  name: "PokemonImage",
  data() {
    return {
      /**
       * the variable which decides which image we display
       */
      currentImage: "front_default"
    };
  },
  components: {
    Image
  },
  props: {
    /**
     * all the available images
     */
    sprites: {
      type: Object,
      required: true
    },
    /**
     * whether or not we want to display all the buttons to choose the sprite (or not)
     */
    displayButtons: {
      type: Boolean,
      required: false,
      default: true
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
      default: "96px"
    }
  },
  methods: {
    /**
     * returns true if the current image depicts a shiny pokemon
     */
    isShiny() {
      return this.currentImage.includes("shiny");
    },
    /**
     * returns true if the current image depicts a female pokemon
     */
    isFemale() {
      return this.currentImage.includes("female");
    },
    /**
     * returns true if the current image depicts the back of a pokemon
     */
    isBack() {
      return this.currentImage.includes("back");
    },
    // TODO: the if-else blocks could be generalised and made into a shared function
    /**
     * decides which sprite comes next and sets it as the image to display
     */
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
    /**
     * decide whether to display the shiny or normal version of the pokemon
     */
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
    /**
     * decide whether to display the female or male version of the pokemon
     */
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
