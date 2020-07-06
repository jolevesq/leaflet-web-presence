import Vue from "vue";
import App from "./app.vue";
import Vuex from 'vuex';
import { createStore, RootState } from '@/store';
import vuetify from "./plugins/vuetify";

import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";

// hack to make it work with TypeScipt: https://vue2-leaflet.netlify.app/quickstart/#marker-icons-are-missing
type D = Icon.Default & {
  _getIconUrl: string;
};

delete (Icon.Default.prototype as D)._getIconUrl;

Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

Vue.config.productionTip = false;

const store = createStore();

new Vue({
  store,
  vuetify,
  render: h => h(App)
}).$mount("#wbMap");
