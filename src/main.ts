import Vue from 'vue';
import App from './app.vue';
import Vuetify from 'vuetify/lib';
import { APPVuetify } from './plugins/vuetify';

import { createStore, RootState } from '@/store';

import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../node_modules/leaflet/dist/leaflet.css';

// hack to make Leaflet work with TypeScipt: https://vue2-leaflet.netlify.app/quickstart/#marker-icons-are-missing
type D = Icon.Default & {
    _getIconUrl: string;
};
delete (Icon.Default.prototype as D)._getIconUrl;

Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// turn off vue production tip
Vue.config.productionTip = false;

// loop trought all the maps to create and create an app for it.
// create an instance of vuetify for each map to be able to modify values like language
const maps = document.getElementsByClassName('llwb-map');
[...maps].forEach((map: HTMLElement) => {
    let element: HTMLElement = document.getElementById(`${map.id}`);
    let mapId = `${map.id}`;

    new Vue({
        mapId,
        store: createStore(),
        vuetify: (new APPVuetify() as typeof Vuetify),
        render: h => h(App)
    }).$mount(element);
});