<template>
  <transition name="fade" mode="out-in">
    <div class="types" v-if="loaded">
      <b
        v-for="type in internalTypes"
        :key="`pokemon_type_${type.name}`"
        :style="`background: ${typeStyle(type.name)};`"
        class="rounded p-1 d-inline-block mb-2 mx-1"
        >{{ getValueByLanguage(type.names)[0].name }}</b
      >
    </div>
    <div v-else>
      <Spinner class="position-absolute" />
      <span class="rounded p-1 d-inline-block mb-2 mx-1">&nbsp;</span>
    </div>
  </transition>
</template>

<script lang="ts">
import methods from "../mixins/methods";
import { defineComponent } from "vue";
import { AxiosPromise, AxiosResponse } from "axios";
import Spinner from "../components/Spinner.vue";
interface Type {
  url: string;
  slot: number;
  type: {
    name: string;
    url: string;
  };
  names: [
    {
      language: {
        name: string;
        url: string;
      };
      name: string;
    }
  ];
}

export default defineComponent({
  name: "Types",
  data() {
    return {
      internalTypes: [] as Array<Type>,
      loaded: false
    };
  },
  components: {
    Spinner
  },
  props: {
    types: {
      type: Object,
      required: true
    }
  },
  async mounted() {
    const typesPromises: Array<AxiosPromise> = this.types.map((type: Type) =>
      this.axios.get(type.type.url)
    );
    const types: Array<AxiosResponse> = await this.axios.all(typesPromises);
    this.internalTypes = types.map(response => response.data);
    this.loaded = true;
  },
  mixins: [methods],
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
