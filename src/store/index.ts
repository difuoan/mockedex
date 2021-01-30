import { createStore } from "vuex";

export default createStore({
  state: {
    limit: 4,
    offset: 0,
    id: 1,
    apiUrl: "https://pokeapi.co/api/v2",
    language: 4
  },
  mutations: {},
  actions: {},
  modules: {}
});
