<template>
  <div class="types">
    <b
      v-for="type in types"
      :key="`pokemon_type_${type.type.name}`"
      :style="`background: ${typeStyle(type.type.name)};`"
      class="rounded p-1 d-inline-block mb-2 mx-1"
      >{{ type.type.name }}</b
    >
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Types",
  props: {
    types: {
      type: Object,
      required: true
    }
  },
  methods: {
    typeStyle(stat: string) {
      switch (stat) {
        case "normal":
          return "white; border: 1px solid lightgray;";
        case "water":
          return "blue; color: white";
        case "electric":
          return "yellow";
        case "bug":
          return "darkgreen; color: white";
        case "poison":
          return "purple; color: white";
        case "fairy":
          return "pink";
        case "ground":
          return "darkkhaki";
        case "fighting":
          return "orange";
        case "psychic":
          return "mediumpurple";
        case "rock":
          return "gray";
        case "steel":
          return "lightsteelblue";
        case "ice":
          return "cyan";
        case "grass":
          return "green; color: white";
        case "ghost":
          return "blueviolet; color: white";
        case "dragon":
          return "crimson; color: white";
        case "fire":
          return "firebrick; color: white";
        case "dark":
          return "black; color: white";
        case "flying":
          return "linear-gradient(180deg, cyan 50%, darkkhaki 50%, darkkhaki 100%)";
        default:
          return "white";
      }
    }
  }
});
</script>
