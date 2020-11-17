import Vue from 'vue';
import Vuetify from 'vuetify/lib';

// icons (set icons in their own file)
import closePanelLeft from '../assets/icons/close-panel-left.vue';
import sideMenu from '../assets/icons/side-menu.vue';
import github from '../assets/icons/github.vue';
import layers from '../assets/icons/layers.vue';
import fullScreen from '../assets/icons/full-screen.vue';
import help from '../assets/icons/help.vue';
import home from '../assets/icons/home.vue';
import zoomIn from '../assets/icons/zoom-in.vue';
import zoomOut from '../assets/icons/zoom-out.vue';

// translations
import en from '../assets/i18n/en-CA';
import fr from '../assets/i18n/fr-CA';

Vue.use(Vuetify);

const opts = {
    iconfont: 'md',
    icons: { 
        values: {
            sideMenu: { component: sideMenu },
            github: { component: github },
            layers: { component: layers },
            closePanelLeft: { component: closePanelLeft },
            fullScreen: { component: fullScreen },
            help: { component: help },
            home: { component: home},
            zoomIn: { component: zoomIn },
            zoomOut: { component: zoomOut }
        }
    },
    breakpoint: {
        thresholds: {
          xs: 340,
          sm: 540,
          md: 800,
          lg: 1280,
        },
        scrollBarWidth: 24,
    },
    rtl: false,
    theme: {
        themes: {
            light: {
                primary: '#3f51b5',
                secondary: '#b0bec5',
                accent: '#8c9eff',
                error: '#b71c1c',
            }
        }
    },
    lang: {
        locales: { en, fr },
        current: 'en',
    },
};

/**
 * A class to create a new instance of Vuetify for every app on a page.
 *
 * @export
 * @class APPVuetify
 */
export class APPVuetify {
    /**
     * Creates an instance of APPVuetify.
     *
     * @memberof APPVuetify
     */
    constructor() {
        return new Vuetify(opts);
    }
};