import Vue from "vue";
import * as VueGoogleMaps from "vue2-google-maps";

import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "./styles/index.css";
import secrets from "../secrets";

Vue.use(VueGoogleMaps, {
  load: {
    key: secrets.GMAP_KEY,
    libraries: "places"
  },

  installComponents: true
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
