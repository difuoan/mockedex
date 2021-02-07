import { createStore } from "vuex";

export default createStore({
  state: {
    limit: 4, // the number of pokemons we will display in the pokedex-component
    offset: 0, // we will load only pokemon with bigger ids than this one in the pokedex-component
    id: 1, // the id of the pokemon we will display in the pokemon-component
    apiUrl: "https://pokeapi.co/api/v2", // the url of the api we use
    language: "fr" // the currently used language (currently fr because it reminds me of fond memories)
  },
  mutations: {},
  actions: {},
  modules: {}
});
