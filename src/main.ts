import { createApp } from "vue";
import App from "./App.vue"; // import our base-app-component
import router from "./router"; // import the index.ts file that contains our router implementation
import store from "./store"; // import the index.ts file that contains our store implementation
import axios from "axios";
import VueAxios from "vue-axios";
import "./assets/scss/main.scss"; // globally import our general styles (handle specifics in the scoped component-style-tag)

// create an app from our base-app-component and inject everything we need
createApp(App)
  .use(store)
  .use(router)
  .use(VueAxios, axios)
  .mount("#app");
