import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Pokedex from "../views/Pokedex.vue";
import Pokemon from "../views/Pokemon.vue";
import PokedexWrapper from "../views/PokedexWrapper.vue";
import PokemonWrapper from "../views/PokemonWrapper.vue";
import NotFound from "../views/NotFound.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/pokedex/0/4"
  },
  {
    path: "/pokedex",
    name: "PokedexWrapper",
    redirect: "/pokedex/0/4",
    component: PokedexWrapper,
    children: [
      {
        path: ":offset/:limit",
        name: "Pokedex",
        component: Pokedex,
        props: true
      }
    ]
  },
  {
    path: "/pokemon",
    redirect: "/pokemon/1",
    component: PokemonWrapper,
    children: [
      {
        path: ":id",
        name: "Pokemon",
        component: Pokemon,
        props: true
      }
    ]
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: NotFound
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
