import { defineComponent } from "vue";
import "../mixins/interfaces";

export default defineComponent({
  methods: {
    async loadPokemon(id = "1") {
      let result = null;
      result = await this.axios.get(`${this.$store.state.apiUrl}/${id}`);
      const data = result.data;
      return data as Pokemon;
    },
    pad(
      stringToPad: string,
      length: number,
      character: string,
      start: boolean
    ) {
      let returnString = new String();
      const charsToAdd = new Number(length - stringToPad.length);
      for (let index = 0; index < charsToAdd; index++) {
        returnString += character;
      }
      if (start === true) {
        returnString += stringToPad;
      } else {
        returnString = stringToPad + returnString;
      }
      return returnString;
    },
    async nextPokemons() {
      this.$store.state.offset = Number(
        Number(this.$store.state.offset) + Number(this.$store.state.limit)
      );
    },
    async previousPokemons() {
      this.$store.state.offset = Number(
        Number(this.$store.state.offset) - Number(this.$store.state.limit)
      );
    },
    rerouteToPokedex() {
      if (
        this.$store.state.id <= this.$store.state.offset ||
        this.$store.state.id >
          this.$store.state.offset + this.$store.state.limit
      ) {
        this.$store.state.offset = this.$store.state.id - 1;
      }
      this.$router.push({ name: "Pokedex" });
    }
  }
});
