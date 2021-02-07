import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Pokedex from "../views/Pokedex.vue";
import Pokemon from "../views/Pokemon.vue";
import PokedexWrapper from "../views/PokedexWrapper.vue";
import PokemonWrapper from "../views/PokemonWrapper.vue";
import NotFound from "../views/NotFound.vue";

const routes: Array<RouteRecordRaw> = [
  {
    // since we only have two routes we want both of them to have names, so we redirect from "home" right to the pokedex which takes its place
    path: "/",
    redirect: "/pokedex/0/4"
  },
  {
    path: "/pokedex",
    name: "PokedexWrapper",
    // since this is only a wrapper we want anyone who loads it directly to be re-routed to its child
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
    // since this is only a wrapper we want anyone who loads it directly to be re-routed to its child
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
    // anything we don't recognise will be caught by this
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
